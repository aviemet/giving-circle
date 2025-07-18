import { Box, Button } from "@mantine/core"
import { Puck, usePuck, type Data } from "@measured/puck"
import clsx from "clsx"
import { useState } from "react"
import "@measured/puck/puck.css"

import * as classes from "./Puck.css"
import { config } from "./puckConfig"

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
				iframe={ { enabled: true } }
				onPublish={ handleSave }
				onChange={ handleChange }
				overrides={ {
					// headerActions: () => (
					// 	<Button onClick={ () => handleSave(appState.data) }>
					// 		Save
					// 	</Button>
					// ),
				} }
			/>
		</Box>
	)
}

export default VisualEditor
