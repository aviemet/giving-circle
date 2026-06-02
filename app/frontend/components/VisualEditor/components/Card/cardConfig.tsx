import { type ComponentConfig } from "@measured/puck"

import { CardDisplay } from "./Card"
import {
	colorField,
	layoutStyleFields,
	tagsField,
	type LayoutStyleProps,
} from "../../fields"

export type CardProps = LayoutStyleProps & {
	title: string
	description: string
	backgroundColor: string
	fontColor: string
}

export const cardConfig: ComponentConfig<CardProps> = {
	label: "Card",
	fields: {
		title: tagsField({
			label: "Title",
		}),
		description: tagsField({
			label: "Description",
		}),
		...layoutStyleFields(),
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
	render: (props) => <CardDisplay { ...props } />,
}
