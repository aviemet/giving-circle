import { describe, expect, test, beforeEach } from "vitest"

import {
	applySlideTitleToData,
	clearEditorDraft,
	editorStorageKey,
	resolveInitialEditorData,
	shouldPromptForUnsavedEditorNavigation,
	slideDataEquals,
	slideTitleFromData,
	writeEditorDraft,
} from "@/components/VisualEditor/editorPersistence"
import { createStarterSlideData } from "@/components/VisualEditor/slotEditor"

describe("components/VisualEditor/editorPersistence", () => {
	const slideKey = "test-slide"
	const storageKey = editorStorageKey(slideKey)

	beforeEach(() => {
		window.localStorage.clear()
	})

	test("resolveInitialEditorData loads saved data when no local draft exists", () => {
		const saved = {
			content: [{ type: "Heading", props: { title: "From server" } }],
			root: { props: { title: "Slide" } },
		}

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
		expect(result.data.content?.[0]?.props.title).toBe("From server")
	})

	test("resolveInitialEditorData recovers a local draft that differs from saved data", () => {
		const saved = createStarterSlideData()
		writeEditorDraft(storageKey, {
			...saved,
			content: [{ type: "Heading", props: { title: "Local only" } }],
		} as never)

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe("localDraft")
		expect(result.saveStatus).toBe("recovered")
		expect(result.data.content?.[0]?.props.title).toBe("Local only")
	})

	test("resolveInitialEditorData ignores a local draft that matches saved data", () => {
		const saved = createStarterSlideData()
		writeEditorDraft(storageKey, saved as never)

		const result = resolveInitialEditorData({ savedData: saved, storageKey, slideKey })

		expect(result.loadSource).toBe("server")
		expect(result.saveStatus).toBe("saved")
		expect(window.localStorage.getItem(storageKey)).toBeNull()
	})

	test("clearEditorDraft removes the local draft", () => {
		writeEditorDraft(storageKey, createStarterSlideData() as never)
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
		const data = {
			content: [{ type: "Heading", props: { title: "Body" } }],
			root: { props: { title: "Stale puck title" } },
		}

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
})
