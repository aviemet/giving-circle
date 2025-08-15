import { type ComponentConfig } from "@measured/puck"

import { Card, Text } from "@/components"

import { colorField } from "../fields"

export type CardProps = {
	title: string
	description: string
	padding: number
	backgroundColor: string
	fontColor: string
}

export const cardConfig: ComponentConfig<CardProps> = {
	fields: {
		title: { type: "text" },
		description: { type: "textarea" },
		padding: { type: "number", min: 4, max: 64 },
		backgroundColor: colorField({
			label: "Background Color",
		}),
		fontColor: colorField({
			label: "Font Color",
		}),
	},
	defaultProps: {
		title: "Topic Title",
		description: "Topic description...",
		padding: 16,
		backgroundColor: "#FEFEFE",
		fontColor: "#111111",
	},
	render: ({ title, description, padding, backgroundColor, fontColor }) => {
		return (
			<Card style={ { padding, backgroundColor } }>
				<Card.Section></Card.Section>
				<Text>{ description }</Text>
			</Card>
		)
	},
}

