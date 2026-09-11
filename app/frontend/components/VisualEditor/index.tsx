import "@puckeditor/core/puck.css"

import { type Config } from "@puckeditor/core"
import { useMemo } from "react"

import { type PresentationDataPresentation } from "@/features/presentation/PresentationDataProvider"

import { EditorSave } from "./lib/EditorSave"
import {
	applySlideTitleToData,
	editorStorageKey,
	resolveInitialEditorData,
	type PuckSlideData,
} from "./lib/EditorSave/editorPersistence"
import { VisualEditorWorkspace } from "./VisualEditorWorkspace"

export type { PuckSlideData } from "./lib/EditorSave/editorPersistence"
export { slideSaveExtras, type SlideSaveExtras } from "./lib/captureSlideSnapshot"

export interface VisualEditorProps {
	initialData?: PuckSlideData
	slideTitle?: string
	presentation?: PresentationDataPresentation
	onSave?: (data: PuckSlideData) => void | Promise<void>
	slideKey: string
	returnTo?: string
	puckConfig?: Config
}

export function VisualEditor({
	initialData = {},
	slideTitle = "",
	presentation,
	onSave,
	slideKey,
	returnTo,
	puckConfig,
}: VisualEditorProps) {
	const serverSavedData = useMemo(() => {
		return applySlideTitleToData(initialData, slideTitle) ?? {}
	}, [initialData, slideTitle])

	const storageKey = useMemo(() => editorStorageKey(slideKey), [slideKey])

	const initialLoad = useMemo(() => {
		return resolveInitialEditorData({
			savedData: serverSavedData,
			storageKey,
			slideKey,
		})
	}, [serverSavedData, slideKey, storageKey])

	return (
		<EditorSave
			onSave={ onSave }
			slideKey={ slideKey }
			storageKey={ storageKey }
			returnTo={ returnTo }
			initialLoad={ initialLoad }
			serverSavedData={ serverSavedData }
		>
			<VisualEditorWorkspace
				presentation={ presentation }
				puckConfig={ puckConfig }
			/>
		</EditorSave>
	)
}
