import { Box, Button } from "@mantine/core"
import { createUsePuck, Puck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useState } from "react"
import "@measured/puck/puck.css"

import { config } from "./puck.config"
import * as classes from "./Puck.css"
import { SaveIcon } from "../Icons"

const usePuck = createUsePuck()

const initialData = {}

const VisualEditor = () => {
	const [data] = useState<Data>(() => {
		const dataStr = localStorage.getItem("lskdfjsdlkfj")

		if(dataStr) {
			return JSON.parse(dataStr)
		}

		return config
	})

	// Save the data to your database
	const handleSave = (data: Data) => {
		console.log({ data })
	}

	const handleChange = (changed: Data) => {
		// dispatch({
		// 	type: 'setData',
		// 	data: { content: changed },
		// })
		console.log({ changed })
	}

	return (
		<Box className={ clsx(classes.puckRoot) }>
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
							>
								Save
							</Button>
						)
					},
				} }
			/>
		</Box>
	)
}

export default VisualEditor
