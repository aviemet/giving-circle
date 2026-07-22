import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

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

const t = i18n.t.bind(i18n)

export const cardConfig: ComponentConfig<CardProps> = {
	label: t("slides.editor.components.card.label"),
	fields: {
		title: tagsField({
			label: t("slides.editor.components.card.title"),
		}),
		description: tagsField({
			label: t("slides.editor.components.card.description"),
		}),
		sizing: flexItemSizingField(),
		margin: marginField(),
		padding: paddingField(),
		borderWidth: borderWidthField(),
		borderRadius: borderRadiusField(),
		borderColor: borderColorField(),
		flex: flexField(),
		backgroundColor: colorField({
			label: t("slides.editor.components.card.background_color"),
		}),
		fontColor: colorField({
			label: t("slides.editor.components.card.font_color"),
		}),
	},
	defaultProps: {
		title: t("slides.editor.components.card.default_title"),
		description: t("slides.editor.components.card.default_description"),
		backgroundColor: "#FEFEFE",
		fontColor: "#111111",
		sizing: { mode: "auto" },
	},
	render: (props) => <CardDisplay { ...props } />,
}
