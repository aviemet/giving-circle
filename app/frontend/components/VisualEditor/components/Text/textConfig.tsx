import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Text, type TextProps } from "./Text"
import {
	alignmentField,
	defaultTextFlow,
	defaultTextFontValue,
	defaultTextLayout,
	defaultTypeStyle,
	normalizeTextFlow,
	normalizeTextFontValue,
	normalizeTextLayout,
	normalizeTypeStyle,
	tagsField,
	textFlowField,
	textFontField,
	textLayoutField,
	typeStyleField,
} from "../../fields"

export const textConfig: ComponentConfig<TextProps> = {
	label: i18n.t("slides.editor.components.text.label"),
	fields: {
		content: tagsField({
			label: i18n.t("slides.editor.components.text.content"),
		}),
		font: textFontField({
			allowInherit: true,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "xl",
		}),
		typeStyle: typeStyleField({ fallbackWeight: 400 }),
		alignment: alignmentField({
			label: i18n.t("slides.editor.components.text.alignment"),
		}),
		flow: textFlowField({ includeTruncate: true }),
		layout: textLayoutField(),
	},

	defaultProps: {
		content: i18n.t("slides.editor.components.text.default_content"),
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "xl",
		}),
		typeStyle: defaultTypeStyle(400),
		alignment: "left",
		flow: defaultTextFlow(true),
		layout: defaultTextLayout(),
	},

	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				font: normalizeTextFontValue(props.font, {
					color: "#FFFFFF",
					sizePreset: "xl",
				}),
				typeStyle: normalizeTypeStyle(props.typeStyle, 400),
				flow: normalizeTextFlow(props.flow, true),
				layout: normalizeTextLayout(props.layout),
			},
		}
	},

	render: (props) => <Text { ...props } />,
}
