import { useCallback, useMemo, useRef, useState } from "react"

import { NavigationInterrupt } from "@/components/Modal"
import { type PresentationDataPresentation } from "@/features/presentation"

import {
	applySlideTitleToData,
	clearEditorDraft,
	editorStorageKey,
	normalizeSavedSlideData,
	resolveInitialEditorData,
	shouldPromptForUnsavedEditorNavigation,
	type EditorSaveStatus,
	type PuckSlideData,
} from "./editorPersistence"
import { VisualEditorWorkspace } from "./VisualEditorWorkspace"

export interface VisualEditorProps {
	initialData?: PuckSlideData
	slideTitle: string
	presentation?: PresentationDataPresentation
	onSave?: (data: PuckSlideData) => void | Promise<void>
	isSaving?: boolean
	slideKey: string
	returnTo?: string
}

export function VisualEditorContent({
	initialData = {},
	slideTitle,
	presentation,
	onSave,
	isSaving = false,
	slideKey,
	returnTo,
}: VisualEditorProps) {
	const serverSavedData = useMemo(() => {
		return normalizeSavedSlideData(applySlideTitleToData(initialData, slideTitle))
	}, [initialData, slideTitle])

	const storageKey = useMemo(() => editorStorageKey(slideKey), [slideKey])

	const initialLoad = useMemo(() => {
		return resolveInitialEditorData({
			savedData: serverSavedData,
			storageKey,
			slideKey,
		})
	}, [serverSavedData, slideKey, storageKey])

	const savedDataRef = useRef<PuckSlideData>(serverSavedData)
	const latestDataRef = useRef<PuckSlideData>(initialLoad.data)
	const [saveStatus, setSaveStatus] = useState<EditorSaveStatus>(initialLoad.saveStatus)

	const persistSave = useCallback(async (data: PuckSlideData): Promise<boolean> => {
		if(!onSave) return false

		try {
			await onSave(data)
			savedDataRef.current = data
			latestDataRef.current = data
			setSaveStatus("saved")
			clearEditorDraft(slideKey)
			return true
		} catch{
			return false
		}
	}, [onSave, slideKey])

	const navigationEnabled = shouldPromptForUnsavedEditorNavigation(saveStatus, isSaving)

	return (
		<NavigationInterrupt
			enabled={ navigationEnabled }
			historyGuardKey={ slideKey }
			onDiscard={ () => {
				clearEditorDraft(slideKey)
				setSaveStatus("saved")
			} }
			onSaveAndLeave={ () => persistSave(latestDataRef.current) }
			message="You have changes that are not saved to the server. Stay on this page, discard them, or save before leaving."
		>
			<VisualEditorWorkspace
				initialLoad={ initialLoad }
				isSaving={ isSaving }
				returnTo={ returnTo }
				saveStatus={ saveStatus }
				savedDataRef={ savedDataRef }
				latestDataRef={ latestDataRef }
				setSaveStatus={ setSaveStatus }
				slideKey={ slideKey }
				storageKey={ storageKey }
				persistSave={ persistSave }
				presentation={ presentation }
			/>
		</NavigationInterrupt>
	)
}
