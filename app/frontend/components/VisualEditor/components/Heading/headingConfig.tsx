import { type ComponentConfig } from "@measured/puck"

import { i18n } from "@/lib/i18n"

import { HeadingDisplay } from "./Heading"
import {
	alignmentField,
	colorField,
	fontStyleField,
	fontWeightField,
	tagsField,
	textDecorationField,
	textTransformField,
	titleSizeField,
	type AlignmentValue,
	type FontStyleValue,
	type FontWeightValue,
	type TextDecorationValue,
	type TextTransformValue,
	type TitleSizeValue,
} from "../../fields"

export type HeadingProps = {
	title: string
	padding: number
	order: 1 | 2 | 3 | 4 | 5 | 6
	size: TitleSizeValue
	color: string
	fw: FontWeightValue
	td: TextDecorationValue
	tt: TextTransformValue
	fs: FontStyleValue
	alignment: AlignmentValue
	lineClamp: number
	textWrap: "wrap" | "nowrap" | "balance" | "pretty" | "stable"
}

const t = i18n.t.bind(i18n)

export const headingConfig: ComponentConfig<HeadingProps> = {
	label: t("slides.editor.components.heading.label"),
	fields: {
		title: tagsField({
			label: t("slides.editor.components.heading.title"),
		}),
		padding: { type: "number", label: t("slides.editor.components.heading.padding") },
		order: {
			type: "select",
			label: t("slides.editor.components.heading.level"),
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
			],
		},
		size: titleSizeField({
			label: t("slides.editor.components.heading.size"),
		}),
		color: colorField({
			label: t("slides.editor.components.heading.text_color"),
		}),
		fw: fontWeightField({
			label: t("slides.editor.components.heading.fw"),
		}),
		td: textDecorationField({
			label: t("slides.editor.components.heading.td"),
		}),
		tt: textTransformField({
			label: t("slides.editor.components.heading.tt"),
		}),
		fs: fontStyleField({
			label: t("slides.editor.components.heading.fs"),
		}),
		alignment: alignmentField({
			label: t("slides.editor.components.heading.alignment"),
		}),
		lineClamp: {
			type: "number",
			label: t("slides.editor.components.heading.line_clamp"),
		},
		textWrap: {
			type: "select",
			label: t("slides.editor.components.heading.text_wrap"),
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
		title: t("slides.editor.components.heading.default_title"),
		padding: 16,
		order: 1,
		size: "auto",
		color: "#FFFFFF",
		fw: 700,
		td: "none",
		tt: "none",
		fs: "normal",
		alignment: "left",
		lineClamp: 0,
		textWrap: "wrap",
	},

	render: (props) => <HeadingDisplay { ...props } />,
}
