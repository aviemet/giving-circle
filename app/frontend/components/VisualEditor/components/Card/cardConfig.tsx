import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Card, CardProps } from "./Card"
import {
	borderField,
	boxModelField,
	colorField,
	defaultBorderValue,
	flexField,
	flexItemSizingField,
	normalizeBorderValue,
	tagsField,
} from "../../fields"

export const cardConfig: ComponentConfig<CardProps> = {
	label: i18n.t("slides.editor.components.card.label"),
	fields: {
		title: tagsField({
			label: i18n.t("slides.editor.components.card.title"),
		}),
		description: tagsField({
			label: i18n.t("slides.editor.components.card.description"),
		}),
		sizing: flexItemSizingField(),
		spacing: boxModelField(),
		border: borderField(),
		flex: flexField(),
		backgroundColor: colorField({
			label: i18n.t("slides.editor.components.card.background_color"),
		}),
		fontColor: colorField({
			label: i18n.t("slides.editor.components.card.font_color"),
		}),
	},
	defaultProps: {
		title: i18n.t("slides.editor.components.card.default_title"),
		description: i18n.t("slides.editor.components.card.default_description"),
		backgroundColor: "#FEFEFE",
		fontColor: "#111111",
		sizing: { mode: "auto" },
		spacing: {
			margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
		},
		flex: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "nowrap",
			alignItems: "stretch",
			justifyContent: "flex-start",
			overflow: "visible",
			gap: 0,
		},
		border: defaultBorderValue(),
	},
	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				border: normalizeBorderValue(props.border),
			},
		}
	},
	render: (props) => <Card { ...props } />,
}
