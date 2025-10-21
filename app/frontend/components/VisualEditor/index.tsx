import { router } from "@inertiajs/react"
import { Config, createUsePuck, Puck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useState, Suspense } from "react"
import "@measured/puck/puck.css"

import { Menu, Box, Button, Divider, AsyncBoundary, ErrorBoundary, Badge } from "@/components"
import { SaveIcon, DownArrowIcon, TrashIcon } from "@/components/Icons"
import { useLocalStorage, createContext } from "@/lib/hooks"
import { useMockCircle } from "@/queries"

import { config } from "./puck.config"
import * as classes from "./Puck.css"

const [useMockDataContext, MockDataProvider] = createContext<{ mockCircle: Schema.CirclesMock }>()
export { useMockDataContext }

const usePuck = createUsePuck()

interface VisualEditorProps {
	initialData?: Partial<Data>
	onSave?: (data: Data) => void | Promise<void>
	isSaving?: boolean
	templateKey?: string
}

const VisualEditorContent = ({ initialData = {}, onSave, isSaving = false, templateKey }: VisualEditorProps) => {
	const { data: mockCircle, isLoading } = useMockCircle()

	const [data, setData] = useLocalStorage<Partial<Data>>({
		key: `puck-editor-${templateKey ?? "data"}`,
		defaultValue: initialData ?? {},
	})

	const [isDirty, setIsDirty] = useState(false)

	const handleSave = async(data: Data) => {
		if(!onSave) return

		try {
			await onSave(data)
			setIsDirty(false)
		} catch(_error) { }
	}

	const handleChange = (changed: Data) => {
		// console.log({ changed })
		setIsDirty(true)
		setData(changed)
	}

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<Badge>Content</Badge>
			<AsyncBoundary isLoading={ isLoading }>
				<MockDataProvider value={ { mockCircle: mockCircle as Schema.CirclesMock } }>
					<ErrorBoundary>
						<Puck
							config={ config as Config }
							data={ data }
							iframe={ { enabled: false } }
							onPublish={ handleSave }
							onChange={ handleChange }
							overrides={ {
								headerActions: ({ children }) => {
									// eslint-disable-next-line react-hooks/rules-of-hooks
									const appState = usePuck((s) => s.appState)

									return (
										<Button.Group>
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
				</MockDataProvider>
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
