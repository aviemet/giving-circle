import { type ComponentConfig } from "@measured/puck"

import { colorField } from "../fields"

export type CardProps = {
	title: string
	description: string
	padding: number
	backgroundColor: string
}

export const cardConfig: ComponentConfig<CardProps> = {
	fields: {
		title: { type: "text" },
		description: { type: "textarea" },
		padding: { type: "number", min: 4, max: 64 },
		backgroundColor: colorField,
	},
	defaultProps: {
		title: "Topic Title",
		description: "Topic description...",
		padding: 16,
		backgroundColor: "#ffffff",
	},
	render: ({ title, description, padding, backgroundColor }) => {
		return (
			<article style={ { padding, backgroundColor } }>
				<h2>{ title }</h2>
				<p>{ description }</p>
			</article>
		)
	},
}

