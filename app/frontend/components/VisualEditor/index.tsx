import { Box, Button } from "@mantine/core"
import { createUsePuck, Puck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useState, useEffect, ComponentProps } from "react"
import "@measured/puck/puck.css"

import { useLocalStorage } from "@/lib/hooks"

import { config } from "./puck.config"
import * as classes from "./Puck.css"
import ErrorBoundary from "../ErrorBoundary"
import { SaveIcon } from "../Icons"

const usePuck = createUsePuck()

interface VisualEditorProps {
	initialData?: Partial<Data>
	onSave?: (data: Data) => void | Promise<void>
	isSaving?: boolean
	templateKey?: string
}

const VisualEditor = ({ initialData = {}, onSave, isSaving = false, templateKey }: VisualEditorProps) => {
	console.log({ initialData })
	const [data, setData] = useLocalStorage<Partial<Data>>({
		key: `puck-editor-${templateKey ?? "data"}`,
		defaultValue: initialData ?? {},
	})

	const [isDirty, setIsDirty] = useState(false)

	const handleSave = async(data: Data) => {
		if(!onSave) {
			console.error("No onSave handler provided")
			return
		}

		try {
			await onSave(data)
			setIsDirty(false)
		} catch(error) {
			console.error("Failed to save:", error)
		}
	}

	const handleChange = (changed: Data) => {
		console.log({ changed })
		setIsDirty(true)
		setData(changed)
	}

	return (
		<Box className={ clsx(classes.puckRoot) }>
			<ErrorBoundary>
				<Puck
					config={ config }
					data={ data }
					iframe={ { enabled: false } }
					onPublish={ handleSave }
					onChange={ handleChange }
					overrides={ {
						headerActions: ({ children }) => {
							// eslint-disable-next-line react-hooks/rules-of-hooks
							const appState = usePuck((s) => s.appState)

							return (
								<Button
									onClick={ () => handleSave(appState.data) }
									leftSection={ <SaveIcon /> }
									disabled={ !isDirty || isSaving }
									loading={ isSaving }
								>
									Save
								</Button>
							)
						},
					} }
				/>
			</ErrorBoundary>
		</Box>
	)
}

export default VisualEditor
