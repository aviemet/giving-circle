import { type Data } from "@puckeditor/core"
import { isEqual } from "es-toolkit/compat"

import { withStarterSlideContent } from "./slotEditor"

export type EditorLoadSource = "server" | "localDraft"

export type EditorSaveStatus = "saved" | "unsaved" | "recovered"

// Namespaced key so each slide's recovery draft does not collide in localStorage.
export function editorStorageKey(slideKey: string) {
	return `puck-editor-${slideKey}`
}

// Reads a recovery draft after reload or accidental navigation; absent or corrupt storage means no draft to restore.
export function readEditorDraft(storageKey: string): Partial<Data> | null {
	if(typeof window === "undefined") return null

	try {
		const raw = window.localStorage.getItem(storageKey)
		if(!raw) return null

		return JSON.parse(raw) as Partial<Data>
	} catch{
		return null
	}
}

// Persists in-progress edits locally so a refresh or back navigation can recover work before the user saves to the server.
export function writeEditorDraft(storageKey: string, data: Data) {
	if(typeof window === "undefined") return

	try {
		window.localStorage.setItem(storageKey, JSON.stringify(data))
	} catch{ }
}

// Drops the recovery draft once changes are saved, reverted, or confirmed discarded so stale drafts are not offered again.
export function clearEditorDraft(slideKey: string) {
	if(typeof window === "undefined") return

	try {
		window.localStorage.removeItem(editorStorageKey(slideKey))
	} catch{ }
}

// Ensures empty slides still have editable starter content so the editor is usable before the first server save.
export function normalizeSavedSlideData(data: Partial<Data>): Data {
	return withStarterSlideContent(data ?? {}) as Data
}

// Keeps Puck's root title aligned with the slide record so display name and editor state stay in sync on load.
export function applySlideTitleToData(data: Partial<Data>, slideTitle: string): Partial<Data> {
	if(slideTitle.length === 0) {
		return data
	}

	return {
		...data,
		root: {
			...data.root,
			props: {
				...data.root?.props,
				title: slideTitle,
			},
		},
	}
}

// Reads the title back out for persistence so saves can update the slide record from editor data.
export function slideTitleFromData(data: Partial<Data>): string | undefined {
	const title = data.root?.props?.title

	if(typeof title !== "string") {
		return undefined
	}

	const trimmed = title.trim()

	return trimmed.length > 0 ? trimmed : undefined
}

// Deep comparison avoids treating equivalent JSON as dirty, which would trigger false unsaved state and draft writes.
export function slideDataEquals(first: Partial<Data>, second: Partial<Data>) {
	return isEqual(first, second)
}

// Navigation guards only apply while there is unsaved work and a save is not already in flight.
export function shouldPromptForUnsavedEditorNavigation(saveStatus: EditorSaveStatus, isSaving: boolean) {
	return saveStatus !== "saved" && !isSaving
}

// Chooses server data or a recovered local draft on open and sets the initial save badge so the user knows what they are editing.
export function resolveInitialEditorData(params: {
	savedData: Partial<Data>
	storageKey: string
	slideKey: string
}): {
	data: Partial<Data>
	loadSource: EditorLoadSource
	saveStatus: EditorSaveStatus
} {
	const saved = normalizeSavedSlideData(params.savedData)
	const draft = readEditorDraft(params.storageKey)

	if(!draft) {
		return {
			data: saved,
			loadSource: "server",
			saveStatus: "saved",
		}
	}

	if(slideDataEquals(draft, saved)) {
		clearEditorDraft(params.slideKey)

		return {
			data: saved,
			loadSource: "server",
			saveStatus: "saved",
		}
	}

	return {
		data: draft,
		loadSource: "localDraft",
		saveStatus: "recovered",
	}
}
