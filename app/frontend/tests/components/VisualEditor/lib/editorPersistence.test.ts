import { isEqual } from "es-toolkit/compat"
import { describe, expect, test, beforeEach } from "vitest"

import {
	applySlideTitleToData,
	clearEditorDraft,
	EDITOR_LOAD_SOURCE,
	EDITOR_SAVE_STATUS,
	editorStorageKey,
	nextEditorChangeState,
	resolveInitialEditorData,
	slideDataFingerprint,
	slideTitleFromData,
	writeEditorDraft,
	type PuckSlideData,
} from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import { createStarterSlideData } from "@/components/VisualEditor/lib/slotEditor"

function headingSlide(title: string): PuckSlideData {
	return {
		content: [{
			type: "Heading",
			props: {
				id: `heading-${title}`,
				title,
				alignment: "left",
			},
		}],
		root: { props: { title: "Slide" } },
	}
}

describe("components/VisualEditor/editorPersistence", () => {
	const slideKey = "test-slide"
	const storageKey = editorStorageKey(slideKey)
	const memoryStorage = new Map<string, string>()

	beforeEach(() => {
		memoryStorage.clear()
		Object.defineProperty(window, "localStorage", {
			configurable: true,
			value: {
				getItem: (key: string) => memoryStorage.get(key) ?? null,
				setItem: (key: string, value: string) => {
					memoryStorage.set(key, value)
				},
				removeItem: (key: string) => {
					memoryStorage.delete(key)
				},
				clear: () => {
					memoryStorage.clear()
				},
			},
		})
	})

	test("resolveInitialEditorData loads saved data when no local draft exists", () => {
		const saved = headingSlide("From server")

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe(EDITOR_LOAD_SOURCE.server)
		expect(result.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(result.serverFingerprint).toBe(slideDataFingerprint(saved))
		const item = result.data.content?.[0]
		expect(item?.type).toBe("Heading")
		if(item?.type === "Heading") {
			expect(item.props.title).toBe("From server")
		}
	})

	test("resolveInitialEditorData recovers a local draft that differs from saved data", () => {
		const saved = createStarterSlideData()
		const draft = headingSlide("Local only")
		writeEditorDraft(storageKey, draft, slideDataFingerprint(saved))

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe(EDITOR_LOAD_SOURCE.localDraft)
		expect(result.saveStatus).toBe(EDITOR_SAVE_STATUS.recovered)
		expect(result.serverFingerprint).toBe(slideDataFingerprint(saved))
		const item = result.data.content?.[0]
		expect(item?.type).toBe("Heading")
		if(item?.type === "Heading") {
			expect(item.props.title).toBe("Local only")
		}
	})

	test("resolveInitialEditorData ignores a local draft that matches saved data", () => {
		const saved = createStarterSlideData()
		writeEditorDraft(storageKey, saved, slideDataFingerprint(saved))

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe(EDITOR_LOAD_SOURCE.server)
		expect(result.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("resolveInitialEditorData discards a draft whose basedOn no longer matches the server", () => {
		const saved = createStarterSlideData()
		const olderSaved: PuckSlideData = {
			...saved,
			root: { props: { title: "Older server title" } },
		}
		writeEditorDraft(storageKey, headingSlide("Stale local edit"), slideDataFingerprint(olderSaved))

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe(EDITOR_LOAD_SOURCE.server)
		expect(result.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(result.data).toEqual(saved)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("resolveInitialEditorData discards legacy drafts without a basedOn fingerprint", () => {
		const saved = createStarterSlideData()
		window.localStorage.setItem(storageKey, JSON.stringify(headingSlide("Legacy draft")))

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe(EDITOR_LOAD_SOURCE.server)
		expect(result.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("clearEditorDraft removes the local draft", () => {
		writeEditorDraft(storageKey, createStarterSlideData(), "fingerprint")
		clearEditorDraft(slideKey)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("applySlideTitleToData sets the puck root title from the slide record", () => {
		const data = headingSlide("Body")
		const merged = applySlideTitleToData(data, "Card title")

		expect(merged.root?.props?.title).toBe("Card title")
	})

	test("slideTitleFromData reads the puck root title", () => {
		expect(slideTitleFromData({ root: { props: { title: "  My slide  " } } })).toBe("My slide")
		expect(slideTitleFromData({ root: { props: { title: "   " } } })).toBeUndefined()
	})

	test("nextEditorChangeState adopts resolved data as saved during puck hydration", () => {
		const saved = createStarterSlideData()
		const resolved: PuckSlideData = {
			...saved,
			root: {
				props: {
					...saved.root?.props,
					background: {
						color: "#000000",
						image: {
							url: "",
							size: "cover",
							customSize: "",
							offsetX: "0%",
							offsetY: "0%",
							repeat: "no-repeat",
							attachment: "scroll",
						},
					},
				},
			},
		}

		const nextState = nextEditorChangeState({
			changed: resolved,
			saved,
			adoptResolvedBaseline: true,
		})

		expect(nextState.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(nextState.shouldWriteDraft).toBe(false)
		expect(nextState.saved).toEqual(resolved)
	})

	test("nextEditorChangeState marks real edits as unsaved after hydration", () => {
		const saved = createStarterSlideData()
		const changed: PuckSlideData = {
			...saved,
			root: { props: { title: "Edited" } },
		}

		const nextState = nextEditorChangeState({
			changed,
			saved,
			adoptResolvedBaseline: false,
		})

		expect(nextState.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(nextState.shouldWriteDraft).toBe(true)
		expect(nextState.saved).toEqual(saved)
	})

	test("nextEditorChangeState clones the hydration baseline so later puck mutations stay unsaved", () => {
		const saved = createStarterSlideData()
		const resolved: PuckSlideData = {
			...saved,
			root: {
				props: {
					...saved.root?.props,
					title: "Resolved",
				},
			},
		}

		const adopted = nextEditorChangeState({
			changed: resolved,
			saved,
			adoptResolvedBaseline: true,
		})

		if(resolved.root?.props) {
			resolved.root.props.title = "Mutated in place"
		}

		expect(adopted.saved.root?.props?.title).toBe("Resolved")
		expect(isEqual(adopted.saved, resolved)).toBe(false)

		const afterMutation = nextEditorChangeState({
			changed: resolved,
			saved: adopted.saved,
			adoptResolvedBaseline: false,
		})

		expect(afterMutation.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(afterMutation.shouldWriteDraft).toBe(true)
		expect(afterMutation.saved).toEqual(adopted.saved)
	})

	test("nextEditorChangeState greys save only when the document matches the db baseline", () => {
		const saved = createStarterSlideData()
		const changed = structuredClone(saved)

		const nextState = nextEditorChangeState({
			changed,
			saved,
			adoptResolvedBaseline: false,
		})

		expect(nextState.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(nextState.shouldWriteDraft).toBe(false)
	})
})
