import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { TextDisplay } from "./Text"
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
	type AlignmentValue,
	type FontSizeValue,
	type FontStyleValue,
	type FontWeightValue,
	type TextDecorationValue,
	type TextFlowValue,
	type TextFontValue,
	type TextLayoutValue,
	type TextTransformValue,
	type TextWrapValue,
	type TruncateValue,
	type TypeStyleValue,
} from "../../fields"

export type TextComponentProps = {
	content: string
	size?: FontSizeValue
	color?: string
	font?: TextFontValue
	typeStyle?: TypeStyleValue
	fw?: FontWeightValue
	td?: TextDecorationValue
	tt?: TextTransformValue
	fs?: FontStyleValue
	alignment: AlignmentValue
	flow?: TextFlowValue
	layout?: TextLayoutValue
	lineClamp?: number
	truncate?: TruncateValue
	inline?: boolean
	inherit?: boolean
	span?: boolean
	textWrap?: TextWrapValue
}

const t = i18n.t.bind(i18n)

export const textConfig: ComponentConfig<TextComponentProps> = {
	label: t("slides.editor.components.text.label"),
	fields: {
		content: tagsField({
			label: t("slides.editor.components.text.content"),
		}),
		font: textFontField({
			allowInherit: true,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "md",
		}),
		typeStyle: typeStyleField({ fallbackWeight: 400 }),
		alignment: alignmentField({
			label: t("slides.editor.components.text.alignment"),
		}),
		flow: textFlowField({ includeTruncate: true }),
		layout: textLayoutField(),
	},

	defaultProps: {
		content: t("slides.editor.components.text.default_content"),
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "md",
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
				font: normalizeTextFontValue(
					props.font,
					{
						font: props.font,
						color: props.color,
						size: props.size,
					},
					{
						color: "#FFFFFF",
						sizePreset: "md",
					},
				),
				typeStyle: normalizeTypeStyle(props.typeStyle, {
					fw: props.fw,
					td: props.td,
					tt: props.tt,
					fs: props.fs,
				}, 400),
				flow: normalizeTextFlow(
					props.flow,
					{
						lineClamp: props.lineClamp,
						textWrap: props.textWrap,
						truncate: props.truncate,
					},
					true,
				),
				layout: normalizeTextLayout(props.layout, {
					inline: props.inline,
					inherit: props.inherit,
					span: props.span,
				}),
			},
		}
	},

	render: (props) => <TextDisplay { ...props } />,
}
