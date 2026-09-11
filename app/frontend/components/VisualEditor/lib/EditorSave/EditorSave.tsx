import { useCallback, useMemo, useRef, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { NavigationInterrupt, useNavigationInterruptContext } from "@/components/Modal"
import { createContext } from "@/lib/hooks"

import {
	clearEditorDraft,
	EDITOR_LOAD_SOURCE,
	EDITOR_SAVE_STATUS,
	nextEditorChangeState,
	resolveInitialEditorData,
	slideDataFingerprint,
	writeEditorDraft,
	type EditorLoadSource,
	type EditorSaveStatus,
	type PuckSlideData,
} from "./editorPersistence"

export interface EditorSaveProps {
	onSave?: (data: PuckSlideData) => void | Promise<void>
	slideKey: string
	storageKey: string
	returnTo?: string
	initialLoad: ReturnType<typeof resolveInitialEditorData>
	serverSavedData: PuckSlideData
	children: ReactNode
}

export interface EditorSaveController {
	saveStatus: EditorSaveStatus
	isSaving: boolean
	puckData: PuckSlideData
	documentKey: number
	loadSource: EditorLoadSource
	handleSave: (data: PuckSlideData) => Promise<void>
	handleSaveAndClose: (data: PuckSlideData) => Promise<void>
	handleRevert: () => void
	handleCloseWithoutSaving: () => void
	recordChange: (changed: PuckSlideData) => boolean
	releaseHydrationBaseline: () => void
}

const [useEditorSave, EditorSaveProvider] = createContext<EditorSaveController>()
export { useEditorSave }

function useEditorSaveState({
	onSave,
	slideKey,
	storageKey,
	initialLoad,
	serverSavedData,
}: Omit<EditorSaveProps, "returnTo" | "children">) {
	const savedDataRef = useRef<PuckSlideData>(structuredClone(serverSavedData))
	const latestDataRef = useRef<PuckSlideData>(initialLoad.data)
	const closingRef = useRef(false)
	const serverFingerprintRef = useRef(initialLoad.serverFingerprint)
	const adoptResolvedBaselineRef = useRef(initialLoad.loadSource === EDITOR_LOAD_SOURCE.server)
	const [saveStatus, setSaveStatus] = useState<EditorSaveStatus>(initialLoad.saveStatus)
	const [isSaving, setIsSaving] = useState(false)
	const [puckData, setPuckData] = useState<PuckSlideData>(initialLoad.data)
	const [documentKey, setDocumentKey] = useState(0)

	const persistSave = useCallback(async (data: PuckSlideData) => {
		if(!onSave) return false

		setIsSaving(true)
		try {
			await onSave(data)
			savedDataRef.current = structuredClone(data)
			latestDataRef.current = data
			serverFingerprintRef.current = slideDataFingerprint(data)
			setSaveStatus(EDITOR_SAVE_STATUS.saved)
			clearEditorDraft(slideKey)
			return true
		} catch{
			return false
		} finally {
			setIsSaving(false)
		}
	}, [onSave, slideKey])

	const handleSave = useCallback(async (data: PuckSlideData) => {
		await persistSave(data)
	}, [persistSave])

	const handleRevert = useCallback(() => {
		clearEditorDraft(slideKey)
		setSaveStatus(EDITOR_SAVE_STATUS.saved)
		setPuckData({ ...savedDataRef.current })
		latestDataRef.current = savedDataRef.current
		setDocumentKey((previousKey) => previousKey + 1)
	}, [slideKey])

	const handleDiscard = useCallback(() => {
		clearEditorDraft(slideKey)
		setSaveStatus(EDITOR_SAVE_STATUS.saved)
	}, [slideKey])

	const handleSaveAndLeave = useCallback(() => {
		return persistSave(latestDataRef.current)
	}, [persistSave])

	const recordChange = useCallback((changed: PuckSlideData) => {
		if(closingRef.current) {
			return false
		}

		latestDataRef.current = changed

		const nextState = nextEditorChangeState({
			changed,
			saved: savedDataRef.current,
			adoptResolvedBaseline: adoptResolvedBaselineRef.current,
		})

		savedDataRef.current = nextState.saved
		setSaveStatus(nextState.saveStatus)

		if(nextState.shouldWriteDraft) {
			writeEditorDraft(storageKey, changed, serverFingerprintRef.current)
		} else {
			clearEditorDraft(slideKey)
		}

		return true
	}, [slideKey, storageKey])

	const releaseHydrationBaseline = useCallback(() => {
		adoptResolvedBaselineRef.current = false
	}, [])

	const beginClosing = useCallback(() => {
		closingRef.current = true
	}, [])

	return {
		saveStatus,
		isSaving,
		puckData,
		documentKey,
		loadSource: initialLoad.loadSource,
		navigationEnabled: saveStatus !== EDITOR_SAVE_STATUS.saved && !isSaving,
		persistSave,
		handleSave,
		handleRevert,
		handleDiscard,
		handleSaveAndLeave,
		recordChange,
		releaseHydrationBaseline,
		beginClosing,
	}
}

interface EditorSaveNavigationBinderProps {
	persistSave: (data: PuckSlideData) => Promise<boolean>
	beginClosing: () => void
	handleDiscard: () => void
	returnTo?: string
	saveStatus: EditorSaveStatus
	isSaving: boolean
	puckData: PuckSlideData
	documentKey: number
	loadSource: EditorLoadSource
	handleSave: (data: PuckSlideData) => Promise<void>
	handleRevert: () => void
	recordChange: (changed: PuckSlideData) => boolean
	releaseHydrationBaseline: () => void
	children: ReactNode
}

function EditorSaveNavigationBinder({
	persistSave,
	beginClosing,
	handleDiscard,
	returnTo,
	saveStatus,
	isSaving,
	puckData,
	documentKey,
	loadSource,
	handleSave,
	handleRevert,
	recordChange,
	releaseHydrationBaseline,
	children,
}: EditorSaveNavigationBinderProps) {
	const { visitWithBypass, navigateBackWithBypass } = useNavigationInterruptContext()

	const handleSaveAndClose = useCallback(async (data: PuckSlideData) => {
		const saved = await persistSave(data)
		if(saved && returnTo) {
			beginClosing()
			visitWithBypass(returnTo)
		}
	}, [beginClosing, persistSave, returnTo, visitWithBypass])

	const handleCloseWithoutSaving = useCallback(() => {
		beginClosing()
		handleDiscard()

		if(returnTo) {
			visitWithBypass(returnTo)
			return
		}

		const currentUrl = window.location.pathname + window.location.search
		visitWithBypass(currentUrl, { replace: true })
		setTimeout(navigateBackWithBypass, 0)
	}, [beginClosing, handleDiscard, navigateBackWithBypass, returnTo, visitWithBypass])

	const controller = useMemo(() => {
		return {
			saveStatus,
			isSaving,
			puckData,
			documentKey,
			loadSource,
			handleSave,
			handleSaveAndClose,
			handleRevert,
			handleCloseWithoutSaving,
			recordChange,
			releaseHydrationBaseline,
		}
	}, [
		documentKey,
		handleCloseWithoutSaving,
		handleRevert,
		handleSave,
		handleSaveAndClose,
		isSaving,
		loadSource,
		puckData,
		recordChange,
		releaseHydrationBaseline,
		saveStatus,
	])

	return (
		<EditorSaveProvider value={ controller }>
			{ children }
		</EditorSaveProvider>
	)
}

export function EditorSave({
	onSave,
	slideKey,
	storageKey,
	returnTo,
	initialLoad,
	serverSavedData,
	children,
}: EditorSaveProps) {
	const { t } = useTranslation()
	const state = useEditorSaveState({
		onSave,
		slideKey,
		storageKey,
		initialLoad,
		serverSavedData,
	})

	return (
		<NavigationInterrupt
			enabled={ state.navigationEnabled }
			historyGuardKey={ slideKey }
			onDiscard={ state.handleDiscard }
			onSaveAndLeave={ state.handleSaveAndLeave }
			message={ t("slides.editor.header.unsaved_navigation") }
		>
			<EditorSaveNavigationBinder
				persistSave={ state.persistSave }
				beginClosing={ state.beginClosing }
				handleDiscard={ state.handleDiscard }
				returnTo={ returnTo }
				saveStatus={ state.saveStatus }
				isSaving={ state.isSaving }
				puckData={ state.puckData }
				documentKey={ state.documentKey }
				loadSource={ state.loadSource }
				handleSave={ state.handleSave }
				handleRevert={ state.handleRevert }
				recordChange={ state.recordChange }
				releaseHydrationBaseline={ state.releaseHydrationBaseline }
			>
				{ children }
			</EditorSaveNavigationBinder>
		</NavigationInterrupt>
	)
}
