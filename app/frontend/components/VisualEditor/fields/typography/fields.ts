import { type Field } from "@measured/puck"

import { i18n } from "@/lib/i18n"

export type FontWeightValue = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export type TextDecorationValue = "none" | "underline" | "line-through" | "overline"
export type TextTransformValue = "none" | "uppercase" | "lowercase" | "capitalize"
export type FontStyleValue = "normal" | "italic"
export type FontSizeValue = "xs" | "sm" | "md" | "lg" | "xl"
export type TitleSizeValue = "auto" | FontSizeValue | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const t = i18n.t.bind(i18n)

function fieldLabel(key: string) {
	return t(`slides.editor.fields.typography.${key}`)
}

function fontWeightField(): Field<FontWeightValue>
function fontWeightField(params: Partial<Field<FontWeightValue>>): Field<FontWeightValue>
function fontWeightField(params: Partial<Field<FontWeightValue>> = {}): Field<FontWeightValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("fw"),
		options: [
			{ label: "100", value: 100 },
			{ label: "200", value: 200 },
			{ label: "300", value: 300 },
			{ label: "400", value: 400 },
			{ label: "500", value: 500 },
			{ label: "600", value: 600 },
			{ label: "700", value: 700 },
			{ label: "800", value: 800 },
			{ label: "900", value: 900 },
		],
	}
}

function textDecorationField(): Field<TextDecorationValue>
function textDecorationField(params: Partial<Field<TextDecorationValue>>): Field<TextDecorationValue>
function textDecorationField(params: Partial<Field<TextDecorationValue>> = {}): Field<TextDecorationValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("td"),
		options: [
			{ label: fieldLabel("decoration.none"), value: "none" },
			{ label: fieldLabel("decoration.underline"), value: "underline" },
			{ label: fieldLabel("decoration.line_through"), value: "line-through" },
			{ label: fieldLabel("decoration.overline"), value: "overline" },
		],
	}
}

function textTransformField(): Field<TextTransformValue>
function textTransformField(params: Partial<Field<TextTransformValue>>): Field<TextTransformValue>
function textTransformField(params: Partial<Field<TextTransformValue>> = {}): Field<TextTransformValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("tt"),
		options: [
			{ label: fieldLabel("transform.none"), value: "none" },
			{ label: fieldLabel("transform.uppercase"), value: "uppercase" },
			{ label: fieldLabel("transform.lowercase"), value: "lowercase" },
			{ label: fieldLabel("transform.capitalize"), value: "capitalize" },
		],
	}
}

function fontStyleField(): Field<FontStyleValue>
function fontStyleField(params: Partial<Field<FontStyleValue>>): Field<FontStyleValue>
function fontStyleField(params: Partial<Field<FontStyleValue>> = {}): Field<FontStyleValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("fs"),
		options: [
			{ label: fieldLabel("style.normal"), value: "normal" },
			{ label: fieldLabel("style.italic"), value: "italic" },
		],
	}
}

function fontSizeField(): Field<FontSizeValue>
function fontSizeField(params: Partial<Field<FontSizeValue>>): Field<FontSizeValue>
function fontSizeField(params: Partial<Field<FontSizeValue>> = {}): Field<FontSizeValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("size"),
		options: [
			{ label: "xs", value: "xs" },
			{ label: "sm", value: "sm" },
			{ label: "md", value: "md" },
			{ label: "lg", value: "lg" },
			{ label: "xl", value: "xl" },
		],
	}
}

function titleSizeField(): Field<TitleSizeValue>
function titleSizeField(params: Partial<Field<TitleSizeValue>>): Field<TitleSizeValue>
function titleSizeField(params: Partial<Field<TitleSizeValue>> = {}): Field<TitleSizeValue> {
	return {
		type: "select",
		label: params.label ?? fieldLabel("size"),
		options: [
			{ label: fieldLabel("size_auto"), value: "auto" },
			{ label: "xs", value: "xs" },
			{ label: "sm", value: "sm" },
			{ label: "md", value: "md" },
			{ label: "lg", value: "lg" },
			{ label: "xl", value: "xl" },
			{ label: "h1", value: "h1" },
			{ label: "h2", value: "h2" },
			{ label: "h3", value: "h3" },
			{ label: "h4", value: "h4" },
			{ label: "h5", value: "h5" },
			{ label: "h6", value: "h6" },
		],
	}
}

export {
	fontWeightField,
	textDecorationField,
	textTransformField,
	fontStyleField,
	fontSizeField,
	titleSizeField,
}
