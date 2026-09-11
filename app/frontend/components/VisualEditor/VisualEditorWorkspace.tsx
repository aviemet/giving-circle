import { Puck, legacySideBarPlugin, type Config } from "@puckeditor/core"
import clsx from "clsx"
import { useCallback, useEffect, useMemo, useRef } from "react"

const legacySideBar = legacySideBarPlugin()

import { Box, AsyncBoundary, ErrorBoundary } from "@/components"
import { PresentationDataProvider, type PresentationDataPresentation } from "@/features/presentation/PresentationDataProvider"
import { useMockCircle } from "@/queries"

import { config } from "./config"
import { useEditorSave } from "./lib/EditorSave"
import { HeaderActions, VisualEditorUiProvider } from "./lib/HeaderActions"
import { EDITOR_LOAD_SOURCE, type PuckSlideData } from "./lib/EditorSave/editorPersistence"
import { PreviewWithPageSelection, VisualEditorMemberPreview } from "./lib/preview"
import * as classes from "./styles/Puck.css"

export interface VisualEditorWorkspaceProps {
	presentation?: PresentationDataPresentation
	puckConfig?: Config
}

export function VisualEditorWorkspace({
	presentation,
	puckConfig: puckConfigProp,
}: VisualEditorWorkspaceProps) {
	const puckConfig = puckConfigProp ?? config
	const { data: mockCircle, isLoading } = useMockCircle()
	const {
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
	} = useEditorSave()

	const previewChannelRef = useRef<BroadcastChannel | null>(null)

	// Initialize the connection to other browser tabs for the preview window
	useEffect(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		previewChannelRef.current = new BroadcastChannel("visual-editor-preview")

		return () => {
			previewChannelRef.current?.close()
			previewChannelRef.current = null
		}
	})

	useEffect(() => {
		if(isLoading || loadSource !== EDITOR_LOAD_SOURCE.server) return

		const timeoutId = window.setTimeout(() => {
			releaseHydrationBaseline()
		}, 0)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [isLoading, loadSource, releaseHydrationBaseline])

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
		if(!recordChange(changed)) {
			return
		}

		sendToPreview({ type: "update", data: changed })
	}, [recordChange, sendToPreview])

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
				<div className={ clsx(classes.puckDrawer) }>{ children }</div>
			),
			drawerItem: ({ children }: { children: React.ReactNode }) => (
				<div className={ clsx(classes.puckDrawerItem) }>{ children }</div>
			),
			outline: ({ children }: { children: React.ReactNode }) => (
				<div className={ clsx(classes.puckOutline) }>{ children }</div>
			),
			fields: ({ children }: { children: React.ReactNode }) => (
				<div data-testid="puck-fields-container" className={ clsx(classes.puckFields) }>
					{ children }
				</div>
			),
			headerActions: () => <HeaderActions />,
			preview: ({ children }: { children: React.ReactNode }) => (
				<PreviewWithPageSelection>
					<VisualEditorMemberPreview>{ children }</VisualEditorMemberPreview>
				</PreviewWithPageSelection>
			),
		}
	}, [])

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<AsyncBoundary isLoading={ isLoading || mockCircle === undefined }>
				{ mockCircle === undefined
					? <></>
					: (
						<PresentationDataProvider value={ { circle: mockCircle, presentation, isEditor: true } }>
							<ErrorBoundary>
								<VisualEditorUiProvider value={ uiContextValue }>
									<Puck
										key={ documentKey }
										config={ puckConfig }
										data={ puckData }
										iframe={ { enabled: false } }
										onChange={ handleChange }
										overrides={ overrides }
										plugins={ [legacySideBar] }
									/>
								</VisualEditorUiProvider>
							</ErrorBoundary>
						</PresentationDataProvider>
					) }
			</AsyncBoundary>
		</Box>
	)
}
