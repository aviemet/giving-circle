import { MantineProvider } from "@mantine/core"
import { router } from "@inertiajs/react"
import { act, renderHook } from "@testing-library/react"
import { type ReactNode } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"

import { EditorSave, useEditorSave } from "@/components/VisualEditor/lib/EditorSave"
import {
	EDITOR_LOAD_SOURCE,
	EDITOR_SAVE_STATUS,
	editorStorageKey,
	readEditorDraft,
	resolveInitialEditorData,
	slideDataFingerprint,
	writeEditorDraft,
	type PuckSlideData,
} from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import { i18n } from "@/lib/i18n"

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

function renderEditorSave(options: {
	onSave?: (data: PuckSlideData) => void | Promise<void>
	returnTo?: string
	savedData?: PuckSlideData
	slideKey?: string
} = {}) {
	const slideKey = options.slideKey ?? "slide-1"
	const storageKey = editorStorageKey(slideKey)
	const serverSavedData = options.savedData ?? headingSlide("Server")
	const initialLoad = resolveInitialEditorData({
		savedData: serverSavedData,
		storageKey,
		slideKey,
	})

	function Wrapper({ children }: { children: ReactNode }) {
		return (
			<MantineProvider>
				<EditorSave
					onSave={ options.onSave }
					slideKey={ slideKey }
					storageKey={ storageKey }
					returnTo={ options.returnTo }
					initialLoad={ initialLoad }
					serverSavedData={ serverSavedData }
				>
					{ children }
				</EditorSave>
			</MantineProvider>
		)
	}

	return {
		slideKey,
		storageKey,
		serverSavedData,
		...renderHook(() => useEditorSave(), { wrapper: Wrapper }),
	}
}

describe("components/VisualEditor/EditorSave", () => {
	const memoryStorage = new Map<string, string>()

	beforeEach(() => {
		memoryStorage.clear()
		vi.mocked(router.visit).mockClear()
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

	test("leave-page copy comes from slides.editor.header.unsaved_navigation", () => {
		expect(i18n.t("slides.editor.header.unsaved_navigation")).toBe(
			"You have changes that are not saved to the server. Stay on this page, discard them, or save before leaving.",
		)
	})

	test("starts saved when there is no local draft", () => {
		const { result } = renderEditorSave()

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(result.current.isSaving).toBe(false)
		expect(result.current.loadSource).toBe(EDITOR_LOAD_SOURCE.server)
		expect(result.current.documentKey).toBe(0)
	})

	test("recovers a differing local draft", () => {
		const saved = headingSlide("Server")
		const slideKey = "slide-1"
		writeEditorDraft(editorStorageKey(slideKey), headingSlide("Draft"), slideDataFingerprint(saved))

		const { result } = renderEditorSave({ savedData: saved, slideKey })

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.recovered)
		expect(result.current.loadSource).toBe(EDITOR_LOAD_SOURCE.localDraft)
		const recovered = result.current.puckData.content?.[0]
		expect(recovered?.type).toBe("Heading")
		if(recovered?.type === "Heading") {
			expect(recovered.props.title).toBe("Draft")
		}
	})

	test("save persists, marks saved, and clears the draft", async () => {
		const onSave = vi.fn(async () => {})
		const { result, storageKey } = renderEditorSave({ onSave })
		const nextData = headingSlide("Saved")

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(nextData)
		})
		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(readEditorDraft(storageKey)).not.toBeNull()

		await act(async () => {
			await result.current.handleSave(nextData)
		})

		expect(onSave).toHaveBeenCalledWith(nextData)
		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(result.current.isSaving).toBe(false)
		expect(readEditorDraft(storageKey)).toBeNull()
	})

	test("save failure leaves the document unsaved and keeps the draft", async () => {
		const onSave = vi.fn(async () => {
			throw new Error("persist failed")
		})
		const { result, storageKey } = renderEditorSave({ onSave })
		const nextData = headingSlide("Unsaved")

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(nextData)
		})

		await act(async () => {
			await result.current.handleSave(nextData)
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(readEditorDraft(storageKey)).not.toBeNull()
	})

	test("save without onSave does not mark the document saved", async () => {
		const { result, storageKey } = renderEditorSave()
		const nextData = headingSlide("Unsaved")

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(nextData)
		})

		await act(async () => {
			await result.current.handleSave(nextData)
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(readEditorDraft(storageKey)).not.toBeNull()
	})

	test("hydration onChange is adopted as saved and does not write a draft", () => {
		const { result, storageKey } = renderEditorSave()

		act(() => {
			const accepted = result.current.recordChange(headingSlide("Hydrated"))
			expect(accepted).toBe(true)
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(readEditorDraft(storageKey)).toBeNull()
	})

	test("recordChange after hydration writes a draft and marks unsaved", () => {
		const { result, storageKey } = renderEditorSave()

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(headingSlide("Edit"))
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.unsaved)
		expect(readEditorDraft(storageKey)).not.toBeNull()
	})

	test("recordChange is ignored after close without saving", () => {
		const { result } = renderEditorSave({ returnTo: "/slides" })

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(headingSlide("Edit"))
		})

		act(() => {
			result.current.handleCloseWithoutSaving()
		})

		act(() => {
			expect(result.current.recordChange(headingSlide("Ignored"))).toBe(false)
		})
	})

	test("save and close visits returnTo after a successful persist", async () => {
		const onSave = vi.fn(async () => {})
		const nextData = headingSlide("Saved")
		const { result } = renderEditorSave({ onSave, returnTo: "/slides" })

		await act(async () => {
			await result.current.handleSaveAndClose(nextData)
		})

		expect(onSave).toHaveBeenCalledWith(nextData)
		expect(router.visit).toHaveBeenCalledWith("/slides", {})
	})

	test("save and close does not leave when persist fails", async () => {
		const onSave = vi.fn(async () => {
			throw new Error("persist failed")
		})
		const { result } = renderEditorSave({ onSave, returnTo: "/slides" })

		await act(async () => {
			await result.current.handleSaveAndClose(headingSlide("Unsaved"))
		})

		expect(router.visit).not.toHaveBeenCalled()
	})

	test("save and close does not leave when returnTo is missing", async () => {
		const onSave = vi.fn(async () => {})
		const { result } = renderEditorSave({ onSave })

		await act(async () => {
			await result.current.handleSaveAndClose(headingSlide("Saved"))
		})

		expect(onSave).toHaveBeenCalled()
		expect(router.visit).not.toHaveBeenCalled()
	})

	test("close without saving clears the draft and visits returnTo", () => {
		const { result, storageKey } = renderEditorSave({ returnTo: "/slides" })

		act(() => {
			result.current.releaseHydrationBaseline()
			result.current.recordChange(headingSlide("Edit"))
		})
		expect(readEditorDraft(storageKey)).not.toBeNull()

		act(() => {
			result.current.handleCloseWithoutSaving()
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(readEditorDraft(storageKey)).toBeNull()
		expect(router.visit).toHaveBeenCalledWith("/slides", {})
	})

	test("close without saving replaces the current url and goes back when returnTo is missing", () => {
		vi.useFakeTimers()
		const historyBack = vi.spyOn(window.history, "back")
		const { result } = renderEditorSave()

		act(() => {
			result.current.handleCloseWithoutSaving()
		})

		expect(router.visit).toHaveBeenCalledWith(
			window.location.pathname + window.location.search,
			{ replace: true },
		)

		act(() => {
			vi.runAllTimers()
		})
		expect(historyBack).toHaveBeenCalled()

		historyBack.mockRestore()
		vi.useRealTimers()
	})

	test("revert restores the last server snapshot and remounts the document", () => {
		const saved = headingSlide("Server")
		const slideKey = "slide-1"
		writeEditorDraft(editorStorageKey(slideKey), headingSlide("Draft"), slideDataFingerprint(saved))

		const { result, storageKey } = renderEditorSave({ savedData: saved, slideKey })

		act(() => {
			result.current.handleRevert()
		})

		expect(result.current.saveStatus).toBe(EDITOR_SAVE_STATUS.saved)
		expect(result.current.documentKey).toBe(1)
		expect(readEditorDraft(storageKey)).toBeNull()
		const restored = result.current.puckData.content?.[0]
		expect(restored?.type).toBe("Heading")
		if(restored?.type === "Heading") {
			expect(restored.props.title).toBe("Server")
		}
	})
})
