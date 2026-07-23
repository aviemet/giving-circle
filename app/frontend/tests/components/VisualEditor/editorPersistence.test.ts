import { describe, expect, test, beforeEach } from "vitest"

import {
	applySlideTitleToData,
	clearEditorDraft,
	editorStorageKey,
	nextEditorChangeState,
	resolveInitialEditorData,
	shouldPromptForUnsavedEditorNavigation,
	slideDataEquals,
	slideDataFingerprint,
	slideTitleFromData,
	writeEditorDraft,
	type PuckSlideData,
} from "@/components/VisualEditor/editorPersistence"
import { createStarterSlideData } from "@/components/VisualEditor/slotEditor"

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

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
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

		expect(result.loadSource).toBe("localDraft")
		expect(result.saveStatus).toBe("recovered")
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

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
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

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
		expect(result.data).toEqual(saved)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("resolveInitialEditorData discards legacy drafts without a basedOn fingerprint", () => {
		const saved = createStarterSlideData()
		window.localStorage.setItem(storageKey, JSON.stringify(headingSlide("Legacy draft")))

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("clearEditorDraft removes the local draft", () => {
		writeEditorDraft(storageKey, createStarterSlideData(), "fingerprint")
		clearEditorDraft(slideKey)
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("slideDataEquals compares slide documents", () => {
		const first = createStarterSlideData()
		const second = createStarterSlideData()

		expect(slideDataEquals(first, second)).toBe(true)
		expect(slideDataEquals(first, { ...first, root: { props: { title: "Different" } } })).toBe(false)
	})

	test("applySlideTitleToData sets the puck root title from the slide record", () => {
		const data = headingSlide("Body")
		const merged = applySlideTitleToData(data, "Card title")

		expect(merged.root?.props?.title).toBe("Card title")
	})

	test("shouldPromptForUnsavedEditorNavigation is true only for unsaved, idle editors", () => {
		expect(shouldPromptForUnsavedEditorNavigation("saved", false)).toBe(false)
		expect(shouldPromptForUnsavedEditorNavigation("unsaved", true)).toBe(false)
		expect(shouldPromptForUnsavedEditorNavigation("unsaved", false)).toBe(true)
		expect(shouldPromptForUnsavedEditorNavigation("recovered", false)).toBe(true)
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

		expect(nextState.saveStatus).toBe("saved")
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

		expect(nextState.saveStatus).toBe("unsaved")
		expect(nextState.shouldWriteDraft).toBe(true)
		expect(nextState.saved).toEqual(saved)
	})
})
