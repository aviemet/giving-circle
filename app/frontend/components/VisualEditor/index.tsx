import { router } from "@inertiajs/react"
import { createUsePuck, Puck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useCallback, useMemo, useRef, useState, Suspense } from "react"
import "@measured/puck/puck.css"

import { Menu, Box, Button, Divider, AsyncBoundary, ErrorBoundary } from "@/components"
import {
	SaveIcon,
	DownArrowIcon,
	TrashIcon,
} from "@/components/Icons"
import { PresentationDataProvider } from "@/layouts/Providers/PresentationDataProvider"
import { useInit } from "@/lib/hooks"
import { createContext } from "@/lib/hooks/createContext"
import { useMockCircle } from "@/queries"

import { config } from "./puck.config"
import * as classes from "./Puck.css"
import { withStarterSlideContent } from "./slotEditor"

const usePuck = createUsePuck()

const [useVisualEditorUi, VisualEditorUiProvider] = createContext<{
	isDirty: boolean
	isSaving: boolean
	handleSave: (data: Data) => void | Promise<void>
	handleSaveAndClose: (data: Data) => void | Promise<void>
	sendToPreview: (payload: { type: "update", data: Data }) => void
	handleDiscardAndClose: () => void
}>()

interface VisualEditorProps {
	initialData?: Partial<Data>
	onSave?: (data: Data) => void | Promise<void>
	isSaving?: boolean
	templateKey?: string
	returnTo?: string
}

function HeaderActions() {
	const ui = useVisualEditorUi()
	const appState = usePuck((s) => s.appState)

	return (
		<Button.Group>
			<Button
				variant="default"
				onClick={ () => {
					window.sessionStorage.setItem("puck-preview-data", JSON.stringify(appState.data))
					ui.sendToPreview({ type: "update", data: appState.data })
					window.open("/preview/slide", "_blank")
				} }
			>
				Open preview
			</Button>
			<Button
				onClick={ () => ui.handleSave(appState.data) }
				leftSection={ <SaveIcon /> }
				disabled={ !ui.isDirty || ui.isSaving }
				loading={ ui.isSaving }
				style={ { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }
			>
				Save
			</Button>
			<Menu position="bottom-end">
				<Menu.Target>
					<Button p="xs">
						<DownArrowIcon />
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						disabled={ !ui.isDirty || ui.isSaving }
						leftSection={ <SaveIcon /> }
						onClick={ () => ui.handleSaveAndClose(appState.data) }
					>
						Save and Close
					</Menu.Item>
					<Divider />
					<Menu.Item
						leftSection={ <TrashIcon color="red" /> }
						onClick={ ui.handleDiscardAndClose }
					>
						Discard and Close
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Button.Group>
	)
}

const VisualEditorContent = ({ initialData = {}, onSave, isSaving = false, templateKey, returnTo }: VisualEditorProps) => {
	const { data: mockCircle, isLoading } = useMockCircle()

	const previewChannelRef = useRef<BroadcastChannel | null>(null)

	const storageKey = useMemo(() => `puck-editor-${templateKey ?? "data"}`, [templateKey])
	const [data] = useState<Partial<Data>>(() => {
		if(typeof window === "undefined") {
			return withStarterSlideContent(initialData ?? {})
		}

		try {
			const raw = window.localStorage.getItem(storageKey)
			if(raw) {
				return JSON.parse(raw) as Partial<Data>
			}
		} catch{ }

		return withStarterSlideContent(initialData ?? {})
	})

	const [isDirty, setIsDirty] = useState(false)

	useInit(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		previewChannelRef.current = new BroadcastChannel("visual-editor-preview")

		return () => {
			previewChannelRef.current?.close()
			previewChannelRef.current = null
		}
	})

	const persistSave = useCallback(async(data: Data): Promise<boolean> => {
		if(!onSave) return false

		try {
			await onSave(data)
			setIsDirty(false)
			return true
		} catch{
			return false
		}
	}, [onSave])

	const handleSave = useCallback(async(data: Data) => {
		await persistSave(data)
	}, [persistSave])

	const sendToPreview = useCallback((payload: { type: "update", data: Data }) => {
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

	const handleChange = useCallback((changed: Data) => {
		setIsDirty((previousIsDirty) => previousIsDirty || true)
		try {
			window.localStorage.setItem(storageKey, JSON.stringify(changed))
		} catch{ }
		sendToPreview({ type: "update", data: changed })
	}, [sendToPreview, storageKey])

	const handleSaveAndClose = useCallback(async(data: Data) => {
		const saved = await persistSave(data)
		if(saved && returnTo) {
			router.visit(returnTo)
		}
	}, [persistSave, returnTo])

	const handleDiscardAndClose = useCallback(() => {
		if(returnTo) {
			router.visit(returnTo)
			return
		}

		const currentUrl = window.location.pathname + window.location.search
		router.visit(currentUrl, { replace: true })
		setTimeout(() => window.history.back(), 0)
	}, [returnTo])

	const uiContextValue = useMemo(() => {
		return {
			isDirty,
			isSaving,
			handleSave,
			handleSaveAndClose,
			sendToPreview,
			handleDiscardAndClose,
		}
	}, [handleDiscardAndClose, handleSave, handleSaveAndClose, isDirty, isSaving, sendToPreview])

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
		}
	}, [])

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<AsyncBoundary isLoading={ isLoading }>
				<PresentationDataProvider value={ { circle: mockCircle!, isEditor: true } }>
					<ErrorBoundary>
						<VisualEditorUiProvider value={ uiContextValue }>
							<Puck
								config={ config }
								data={ data }
								iframe={ { enabled: false } }
								onPublish={ handleSave }
								onChange={ handleChange }
								overrides={ overrides }
							/>
						</VisualEditorUiProvider>
					</ErrorBoundary>
				</PresentationDataProvider>
			</AsyncBoundary>
		</Box>
	)
}

const VisualEditor = (props: VisualEditorProps) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<VisualEditorContent { ...props } />
		</Suspense>
	)
}

export { VisualEditor }
