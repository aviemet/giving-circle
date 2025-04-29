import React, { useState } from "react"
import { Puck, PuckComponent, usePuck, type Config, type Data } from "@measured/puck"
import "@measured/puck/puck.css"
import { Box, Button } from "@mantine/core"
import cx from "clsx"

import * as classes from "./Puck.css"

type Components = {
	HeadingBlock: {}
};

// Create Puck component config
const config: Config<Components> = {
	components: {
		HeadingBlock: {
			fields: {
				children: {
					type: "text",
				},
			},
			render: ({ children }: PuckComponent<{}>) => {
				return <h1>{ children }</h1>
			},
		},
	},
}

const initialData = {}

const VisualEditor = () => {
	const { appState } = usePuck()

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
		<Box className={ cx(classes.puckRoot) }>
			<Puck
				config={ config }
				data={ data }
				iframe={ { enabled: true } }
				onPublish={ handleSave }
				onChange={ handleChange }
				overrides={ {
					headerActions: () => (
						<Button onClick={ () => handleSave(appState.data) }>
							Save
						</Button>
					),
				} }
			/>
		</Box>
	)
}

export default VisualEditor
