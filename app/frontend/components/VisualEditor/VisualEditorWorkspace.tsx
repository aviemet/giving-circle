import { Puck, legacySideBarPlugin } from "@puckeditor/core"
import clsx from "clsx"
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from "react"

const legacySideBar = legacySideBarPlugin()

import { Box, AsyncBoundary, ErrorBoundary } from "@/components"
import { useNavigationInterruptContext } from "@/components/Modal"
import { PresentationDataProvider, type PresentationDataPresentation } from "@/features/presentation"
import { useInit } from "@/lib/hooks"
import { useMockCircle } from "@/queries"

import {
	clearEditorDraft,
	nextEditorChangeState,
	resolveInitialEditorData,
	slideDataFingerprint,
	writeEditorDraft,
	type EditorSaveStatus,
	type PuckSlideData,
} from "./editorPersistence"
import { HeaderActions, VisualEditorUiProvider } from "./HeaderActions"
import { PreviewWithPageSelection } from "./PreviewWithPageSelection"
import { config, type EditorConfig } from "./puck.config"
import * as classes from "./Puck.css"

export interface VisualEditorWorkspaceProps {
	initialLoad: ReturnType<typeof resolveInitialEditorData>
	isSaving: boolean
	returnTo?: string
	saveStatus: EditorSaveStatus
	savedDataRef: RefObject<PuckSlideData>
	latestDataRef: RefObject<PuckSlideData>
	setSaveStatus: Dispatch<SetStateAction<EditorSaveStatus>>
	slideKey: string
	storageKey: string
	persistSave: (data: PuckSlideData) => Promise<boolean>
	presentation?: PresentationDataPresentation
}

export function VisualEditorWorkspace({
	initialLoad,
	isSaving,
	returnTo,
	saveStatus,
	savedDataRef,
	latestDataRef,
	setSaveStatus,
	slideKey,
	storageKey,
	persistSave,
	presentation,
}: VisualEditorWorkspaceProps) {
	const { data: mockCircle, isLoading } = useMockCircle()
	const { visitWithBypass, navigateBackWithBypass } = useNavigationInterruptContext()

	const previewChannelRef = useRef<BroadcastChannel | null>(null)
	const closingRef = useRef(false)
	const adoptResolvedBaselineRef = useRef(initialLoad.loadSource === "server")
	const serverFingerprintRef = useRef(initialLoad.serverFingerprint)
	const [puckData, setPuckData] = useState<PuckSlideData>(initialLoad.data)
	const [documentKey, setDocumentKey] = useState(0)

	useInit(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		previewChannelRef.current = new BroadcastChannel("visual-editor-preview")

		return () => {
			previewChannelRef.current?.close()
			previewChannelRef.current = null
		}
	})

	useEffect(() => {
		if(initialLoad.loadSource !== "server") {
			return
		}

		if(isLoading) {
			return
		}

		const timeoutId = window.setTimeout(() => {
			adoptResolvedBaselineRef.current = false
			savedDataRef.current = latestDataRef.current
			setSaveStatus("saved")
			clearEditorDraft(slideKey)
		}, 0)

		return () => {
			window.clearTimeout(timeoutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable; wait for mock circle so Puck can mount and resolve
	}, [initialLoad.loadSource, isLoading, setSaveStatus, slideKey])

	const handleSave = useCallback(async (data: PuckSlideData) => {
		const saved = await persistSave(data)
		if(saved) {
			serverFingerprintRef.current = slideDataFingerprint(data)
		}
	}, [persistSave])

	const sendToPreview = useCallback((payload: { type: "update", data: PuckSlideData }) => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		let channel = previewChannelRef.current
		if(!channel) {
			channel = new BroadcastChannel("visual-editor-preview")
			previewChannelRef.current = channel
		}

		try {
			channel.postMessage(payload)
		} catch{
			previewChannelRef.current = null
			channel = new BroadcastChannel("visual-editor-preview")
			previewChannelRef.current = channel

			try {
				channel.postMessage(payload)
			} catch{
				previewChannelRef.current = null
			}
		}
	}, [])

	const handleChange = useCallback((changed: PuckSlideData) => {
		if(closingRef.current) {
			return
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

		sendToPreview({ type: "update", data: changed })
		// eslint-disable-next-line react-hooks/exhaustive-deps -- savedDataRef and latestDataRef are stable ref objects; .current is read at call time
	}, [sendToPreview, setSaveStatus, slideKey, storageKey])

	const handleRevert = useCallback(() => {
		clearEditorDraft(slideKey)
		setSaveStatus("saved")
		setPuckData({ ...savedDataRef.current })
		latestDataRef.current = savedDataRef.current
		setDocumentKey((previousKey) => previousKey + 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps -- savedDataRef and latestDataRef are stable ref objects; .current is read at call time
	}, [slideKey, setSaveStatus])

	const handleSaveAndClose = useCallback(async (data: PuckSlideData) => {
		const saved = await persistSave(data)
		if(saved) {
			serverFingerprintRef.current = slideDataFingerprint(data)
		}
		if(saved && returnTo) {
			closingRef.current = true
			visitWithBypass(returnTo)
		}
	}, [persistSave, returnTo, visitWithBypass])

	const handleCloseWithoutSaving = useCallback(() => {
		closingRef.current = true
		clearEditorDraft(slideKey)
		setSaveStatus("saved")

		if(returnTo) {
			visitWithBypass(returnTo)
			return
		}

		const currentUrl = window.location.pathname + window.location.search
		visitWithBypass(currentUrl, { replace: true })
		setTimeout(navigateBackWithBypass, 0)
	}, [navigateBackWithBypass, returnTo, setSaveStatus, slideKey, visitWithBypass])

	const uiContextValue = useMemo(() => {
		return {
			saveStatus,
			isSaving,
			handleSave,
			handleSaveAndClose,
			handleRevert,
			sendToPreview,
			handleCloseWithoutSaving,
		}
	}, [handleCloseWithoutSaving, handleRevert, handleSave, handleSaveAndClose, isSaving, saveStatus, sendToPreview])

	const overrides = useMemo(() => {
		return {
			drawer: ({ children }: { children: React.ReactNode }) => (
				<div className={ classes.puckDrawer }>{ children }</div>
			),
			drawerItem: ({ children }: { children: React.ReactNode }) => (
				<div className={ classes.puckDrawerItem }>{ children }</div>
			),
			outline: ({ children }: { children: React.ReactNode }) => (
				<div className={ classes.puckOutline }>{ children }</div>
			),
			fields: ({ children }: { children: React.ReactNode }) => (
				<div data-testid="puck-fields-container" className={ classes.puckFields }>
					{ children }
				</div>
			),
			headerActions: () => <HeaderActions />,
			preview: ({ children }: { children: React.ReactNode }) => (
				<PreviewWithPageSelection>{ children }</PreviewWithPageSelection>
			),
		}
	}, [])

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<AsyncBoundary isLoading={ isLoading }>
				<PresentationDataProvider value={ { circle: mockCircle!, presentation, isEditor: true } }>
					<ErrorBoundary>
						<VisualEditorUiProvider value={ uiContextValue }>
							<Puck<EditorConfig>
								key={ documentKey }
								config={ config }
								data={ puckData }
								iframe={ { enabled: false } }
								onChange={ handleChange }
								overrides={ overrides }
								plugins={ [legacySideBar] }
							/>
						</VisualEditorUiProvider>
					</ErrorBoundary>
				</PresentationDataProvider>
			</AsyncBoundary>
		</Box>
	)
}
