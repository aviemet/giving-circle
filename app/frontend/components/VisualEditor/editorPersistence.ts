import { type Data } from "@puckeditor/core"
import { isEqual } from "es-toolkit/compat"

import { type PuckComponentProps, type SlideRootProps } from "./components"
import { withStarterSlideContent } from "./slotEditor"

export type PuckSlideData = Partial<Data<PuckComponentProps, Partial<SlideRootProps>>>

export type EditorLoadSource = "server" | "localDraft"

export type EditorSaveStatus = "saved" | "unsaved" | "recovered"

const DRAFT_ENVELOPE_VERSION = 1

interface EditorDraftEnvelope {
	v: typeof DRAFT_ENVELOPE_VERSION
	basedOn: string
	data: PuckSlideData
}

export function editorStorageKey(slideKey: string) {
	return `puck-editor-${slideKey}`
}

export function slideDataFingerprint(data: PuckSlideData) {
	return JSON.stringify(data)
}

function isPlainObject(value: object | string | number | boolean | null | undefined): value is Record<string, object | string | number | boolean | null | undefined> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isEditorDraftEnvelope(value: object): value is EditorDraftEnvelope {
	if(!isPlainObject(value)) {
		return false
	}

	if(value.v !== DRAFT_ENVELOPE_VERSION) {
		return false
	}

	if(typeof value.basedOn !== "string") {
		return false
	}

	if(!isPlainObject(value.data)) {
		return false
	}

	return true
}

function isLegacyDraftData(value: object): value is PuckSlideData {
	if(!isPlainObject(value)) {
		return false
	}

	return "content" in value || "root" in value
}

export function readEditorDraft(storageKey: string): { data: PuckSlideData, basedOn: string | null } | null {
	if(typeof window === "undefined") return null

	try {
		const raw = window.localStorage.getItem(storageKey)
		if(!raw) return null

		const parsed = JSON.parse(raw)

		if(typeof parsed !== "object" || parsed === null) {
			return null
		}

		if(isEditorDraftEnvelope(parsed)) {
			return {
				data: parsed.data,
				basedOn: parsed.basedOn,
			}
		}

		if(isLegacyDraftData(parsed)) {
			return {
				data: parsed,
				basedOn: null,
			}
		}

		return null
	} catch{
		return null
	}
}

export function writeEditorDraft(storageKey: string, data: PuckSlideData, basedOn: string) {
	if(typeof window === "undefined") return

	const envelope: EditorDraftEnvelope = {
		v: DRAFT_ENVELOPE_VERSION,
		basedOn,
		data,
	}

	try {
		window.localStorage.setItem(storageKey, JSON.stringify(envelope))
	} catch{ }
}

export function clearEditorDraft(slideKey: string) {
	if(typeof window === "undefined") return

	try {
		window.localStorage.removeItem(editorStorageKey(slideKey))
	} catch{ }
}

export function normalizeSavedSlideData(data: PuckSlideData) {
	return withStarterSlideContent(data ?? {})
}

export function applySlideTitleToData(data: PuckSlideData, slideTitle: string): PuckSlideData {
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

export function slideTitleFromData(data: PuckSlideData): string | undefined {
	const title = data.root?.props?.title

	if(typeof title !== "string") {
		return undefined
	}

	const trimmed = title.trim()

	return trimmed.length > 0 ? trimmed : undefined
}

export function slideDataEquals(first: PuckSlideData, second: PuckSlideData) {
	return isEqual(first, second)
}

export function shouldPromptForUnsavedEditorNavigation(saveStatus: EditorSaveStatus, isSaving: boolean) {
	return saveStatus !== "saved" && !isSaving
}

export function nextEditorChangeState(params: {
	changed: PuckSlideData
	saved: PuckSlideData
	adoptResolvedBaseline: boolean
}): {
	saved: PuckSlideData
	saveStatus: EditorSaveStatus
	shouldWriteDraft: boolean
} {
	if(params.adoptResolvedBaseline) {
		return {
			saved: params.changed,
			saveStatus: "saved",
			shouldWriteDraft: false,
		}
	}

	const dirty = !slideDataEquals(params.changed, params.saved)

	return {
		saved: params.saved,
		saveStatus: dirty ? "unsaved" : "saved",
		shouldWriteDraft: dirty,
	}
}

export function resolveInitialEditorData(params: {
	savedData: PuckSlideData
	storageKey: string
	slideKey: string
}): {
	data: PuckSlideData
	loadSource: EditorLoadSource
	saveStatus: EditorSaveStatus
	serverFingerprint: string
} {
	const saved = normalizeSavedSlideData(params.savedData)
	const savedFingerprint = slideDataFingerprint(saved)
	const draft = readEditorDraft(params.storageKey)

	if(!draft) {
		return {
			data: saved,
			loadSource: "server",
			saveStatus: "saved",
			serverFingerprint: savedFingerprint,
		}
	}

	if(draft.basedOn === null || draft.basedOn !== savedFingerprint) {
		clearEditorDraft(params.slideKey)

		return {
			data: saved,
			loadSource: "server",
			saveStatus: "saved",
			serverFingerprint: savedFingerprint,
		}
	}

	if(slideDataEquals(draft.data, saved)) {
		clearEditorDraft(params.slideKey)

		return {
			data: saved,
			loadSource: "server",
			saveStatus: "saved",
			serverFingerprint: savedFingerprint,
		}
	}

	return {
		data: draft.data,
		loadSource: "localDraft",
		saveStatus: "recovered",
		serverFingerprint: savedFingerprint,
	}
}
