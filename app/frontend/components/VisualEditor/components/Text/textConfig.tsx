import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { TextDisplay } from "./Text"
import {
	alignmentField,
	colorField,
	defaultFontValue,
	fontField,
	fontSizeField,
	fontStyleField,
	fontWeightField,
	tagsField,
	textDecorationField,
	textTransformField,
	type AlignmentValue,
	type FontSizeValue,
	type FontStyleValue,
	type FontValue,
	type FontWeightValue,
	type TextDecorationValue,
	type TextTransformValue,
} from "../../fields"

export type TextComponentProps = {
	content: string
	size: FontSizeValue
	color: string
	fw: FontWeightValue
	td: TextDecorationValue
	tt: TextTransformValue
	fs: FontStyleValue
	font: FontValue
	alignment: AlignmentValue
	lineClamp: number
	truncate: "none" | "end" | "start"
	inline: boolean
	inherit: boolean
	span: boolean
	textWrap: "wrap" | "nowrap" | "balance" | "pretty" | "stable"
}

const t = i18n.t.bind(i18n)

const booleanOptions = [
	{ label: t("slides.editor.components.text.boolean.no"), value: false },
	{ label: t("slides.editor.components.text.boolean.yes"), value: true },
]

export const textConfig: ComponentConfig<TextComponentProps> = {
	label: t("slides.editor.components.text.label"),
	fields: {
		content: tagsField({
			label: t("slides.editor.components.text.content"),
		}),
		size: fontSizeField({
			label: t("slides.editor.components.text.size"),
		}),
		color: colorField({
			label: t("slides.editor.components.text.color"),
		}),
		fw: fontWeightField({
			label: t("slides.editor.components.text.fw"),
		}),
		td: textDecorationField({
			label: t("slides.editor.components.text.td"),
		}),
		tt: textTransformField({
			label: t("slides.editor.components.text.tt"),
		}),
		fs: fontStyleField({
			label: t("slides.editor.components.text.fs"),
		}),
		font: fontField({
			allowInherit: true,
		}),
		alignment: alignmentField({
			label: t("slides.editor.components.text.alignment"),
		}),
		lineClamp: {
			type: "number",
			label: t("slides.editor.components.text.line_clamp"),
		},
		truncate: {
			type: "select",
			label: t("slides.editor.components.text.truncate"),
			options: [
				{ label: t("slides.editor.components.text.truncate_options.none"), value: "none" },
				{ label: t("slides.editor.components.text.truncate_options.end"), value: "end" },
				{ label: t("slides.editor.components.text.truncate_options.start"), value: "start" },
			],
		},
		inline: {
			type: "radio",
			label: t("slides.editor.components.text.inline"),
			options: booleanOptions,
		},
		inherit: {
			type: "radio",
			label: t("slides.editor.components.text.inherit"),
			options: booleanOptions,
		},
		span: {
			type: "radio",
			label: t("slides.editor.components.text.span"),
			options: booleanOptions,
		},
		textWrap: {
			type: "select",
			label: t("slides.editor.components.text.text_wrap"),
			options: [
				{ label: "wrap", value: "wrap" },
				{ label: "nowrap", value: "nowrap" },
				{ label: "balance", value: "balance" },
				{ label: "pretty", value: "pretty" },
				{ label: "stable", value: "stable" },
			],
		},
	},

	defaultProps: {
		content: t("slides.editor.components.text.default_content"),
		size: "md",
		color: "#FFFFFF",
		fw: 400,
		td: "none",
		tt: "none",
		fs: "normal",
		font: defaultFontValue(),
		alignment: "left",
		lineClamp: 0,
		truncate: "none",
		inline: false,
		inherit: false,
		span: false,
		textWrap: "wrap",
	},

	render: (props) => <TextDisplay { ...props } />,
}
