import { router } from "@inertiajs/react"
import { createUsePuck, Puck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useEffect, useRef, useState, Suspense } from "react"
import "@measured/puck/puck.css"

import { Menu, Box, Button, Divider, AsyncBoundary, ErrorBoundary } from "@/components"
import {
	SaveIcon,
	DownArrowIcon,
	TrashIcon,
} from "@/components/Icons"
import { useLocalStorage } from "@/lib/hooks"
import { useMockCircle } from "@/queries"

import { config } from "./puck.config"
import * as classes from "./Puck.css"
import { PresentationDataProvider } from "../../layouts/Providers/PresentationDataProvider"

const usePuck = createUsePuck()

interface VisualEditorProps {
	initialData?: Partial<Data>
	onSave?: (data: Data) => void | Promise<void>
	isSaving?: boolean
	templateKey?: string
}

const VisualEditorContent = ({ initialData = {}, onSave, isSaving = false, templateKey }: VisualEditorProps) => {
	const { data: mockCircle, isLoading } = useMockCircle()

	const previewChannelRef = useRef<BroadcastChannel | null>(null)

	const [data, setData] = useLocalStorage<Partial<Data>>({
		key: `puck-editor-${templateKey ?? "data"}`,
		defaultValue: initialData ?? {},
	})

	const [isDirty, setIsDirty] = useState(false)

	useEffect(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		previewChannelRef.current = new BroadcastChannel("visual-editor-preview")

		return () => {
			previewChannelRef.current?.close()
			previewChannelRef.current = null
		}
	}, [])

	const handleSave = async(data: Data) => {
		if(!onSave) return

		try {
			await onSave(data)
			setIsDirty(false)
		} catch(_) { }
	}

	const sendToPreview = (payload: { type: "update", data: Data }) => {
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
	}

	const handleChange = (changed: Data) => {
		setIsDirty(true)
		setData(changed)
		sendToPreview({ type: "update", data: changed })
	}

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<AsyncBoundary isLoading={ isLoading }>
				<PresentationDataProvider value={ { circle: mockCircle!, isEditor: true } }>
					<ErrorBoundary>
						<Puck
							config={ config }
							data={ data }
							iframe={ { enabled: false } }
							onPublish={ handleSave }
							onChange={ handleChange }
							overrides={ {
								drawer: ({ children }) => (
									<div className={ classes.puckDrawer }>{ children }</div>
								),
								drawerItem: ({ children }) => (
									<div className={ classes.puckDrawerItem }>{ children }</div>
								),
								outline: ({ children }) => (
									<div className={ classes.puckOutline }>{ children }</div>
								),
								fields: ({ children }) => (
									<div className={ classes.puckFields }>{ children }</div>
								),
								headerActions: () => {
									// eslint-disable-next-line react-hooks/rules-of-hooks
									const appState = usePuck((s) => s.appState)

									return (
										<Button.Group>
											<Button
												variant="default"
												onClick={ () => {
													window.sessionStorage.setItem("puck-preview-data", JSON.stringify(appState.data))
													sendToPreview({ type: "update", data: appState.data })
													window.open("/preview/slide", "_blank")
												} }
											>
												Open preview
											</Button>
											<Button
												onClick={ () => handleSave(appState.data) }
												leftSection={ <SaveIcon /> }
												disabled={ !isDirty || isSaving }
												loading={ isSaving }
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
														disabled={ !isDirty || isSaving }
														leftSection={ <SaveIcon /> }
													>
														Save and Close
													</Menu.Item>
													<Divider />
													<Menu.Item
														leftSection={ <TrashIcon color="red" /> }
														onClick={ () => {
															const currentUrl = window.location.pathname + window.location.search
															router.visit(currentUrl, { replace: true })
															setTimeout(() => window.history.back(), 0)
														} }
													>
														Discard and Close
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</Button.Group>
									)
								},
							} }
						/>
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

export default VisualEditor
