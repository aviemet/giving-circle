import { type ComponentConfig } from "@measured/puck"

import { CardDisplay } from "./Card"
import {
	borderColorField,
	borderRadiusField,
	borderWidthField,
	colorField,
	flexField,
	flexItemSizingField,
	marginField,
	paddingField,
	type BorderProps,
	type FlexItemSizing,
	type FlexStyleInput,
	type SpacingProps,
	tagsField,
} from "../../fields"

export type CardProps = SpacingProps & BorderProps & FlexStyleInput & {
	title: string
	description: string
	backgroundColor: string
	fontColor: string
	sizing?: FlexItemSizing
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
		sizing: flexItemSizingField(),
		margin: marginField(),
		padding: paddingField(),
		borderWidth: borderWidthField(),
		borderRadius: borderRadiusField(),
		borderColor: borderColorField(),
		flex: flexField(),
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
		sizing: { mode: "auto" },
	},
	render: (props) => <CardDisplay { ...props } />,
}
