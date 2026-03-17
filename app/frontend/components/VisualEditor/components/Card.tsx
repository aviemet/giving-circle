import { type ComponentConfig } from "@measured/puck"

import { Card, Text } from "@/components"

import {
	colorField,
	layoutStyleFields,
	type LayoutStyleProps,
} from "../fields"
import { buildLayoutStyle } from "../fields/layout"

export type CardProps = LayoutStyleProps & {
	title: string
	description: string
	backgroundColor: string
	fontColor: string
}

export const cardConfig: ComponentConfig<CardProps> = {
	fields: {
		...layoutStyleFields(),
		title: { type: "text" },
		description: { type: "textarea" },
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
		backgroundColor: "#FEFEFE",
		fontColor: "#111111",
	},
	render: ({ title, description, backgroundColor, fontColor, ...styleProps }) => {
		return (
			<Card style={ { ...buildLayoutStyle(styleProps), backgroundColor } }>
				<Card.Section></Card.Section>
				<Text c={ fontColor }>{ description }</Text>
			</Card>
		)
	},
}
