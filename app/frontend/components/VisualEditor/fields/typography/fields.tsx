import { type Field } from "@puckeditor/core"
import { type ReactNode } from "react"

import {
	FontItalicIcon,
	FontNormalIcon,
	FontOverlineIcon,
	FontStrikeIcon,
	FontUnderlineIcon,
	TextCapitalizeIcon,
	TextLowercaseIcon,
	TextUppercaseIcon,
} from "@/components/Icons"
import { Select } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import { fontWeightSelectOptions, parseFontWeight, type FontWeightValue } from "./fontWeightOptions"
import * as classes from "./typographyControls.css"
import { IconSegmented, PuckFieldLabel } from "../shared"

export type { FontWeightValue }
export type TextDecorationValue = "none" | "underline" | "line-through" | "overline"
export type TextTransformValue = "none" | "uppercase" | "lowercase" | "capitalize"
export type FontStyleValue = "normal" | "italic"
export type FontSizeValue = "xs" | "sm" | "md" | "lg" | "xl"
export type TitleSizeValue = "auto" | FontSizeValue | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const t = i18n.t.bind(i18n)

function fieldLabel(key: string) {
	return t(`slides.editor.fields.typography.${key}`)
}

function isTextDecorationValue(value: string): value is TextDecorationValue {
	return value === "none"
		|| value === "underline"
		|| value === "line-through"
		|| value === "overline"
}

function isTextTransformValue(value: string): value is TextTransformValue {
	return value === "none"
		|| value === "uppercase"
		|| value === "lowercase"
		|| value === "capitalize"
}

function isFontStyleValue(value: string): value is FontStyleValue {
	return value === "normal" || value === "italic"
}

function isFontSizeValue(value: string): value is FontSizeValue {
	return value === "xs"
		|| value === "sm"
		|| value === "md"
		|| value === "lg"
		|| value === "xl"
}

function isTitleSizeValue(value: string): value is TitleSizeValue {
	return value === "auto"
		|| isFontSizeValue(value)
		|| value === "h1"
		|| value === "h2"
		|| value === "h3"
		|| value === "h4"
		|| value === "h5"
		|| value === "h6"
}

function iconFieldRender<T extends string>(params: {
	label: string
	name: string
	value: T | undefined
	options: { value: T, label: ReactNode, tooltip?: string }[]
	onChange: (value: T) => void
	isValue: (value: string) => value is T
	className?: string
}) {
	return (
		<PuckFieldLabel label={ params.label }>
			<IconSegmented
				className={ params.className }
				name={ params.name }
				value={ params.value }
				options={ params.options }
				onChange={ (nextValue) => {
					if(params.isValue(nextValue)) {
						params.onChange(nextValue)
					}
				} }
			/>
		</PuckFieldLabel>
	)
}

function fontWeightField(): Field<FontWeightValue>
function fontWeightField(params: Partial<Field<FontWeightValue>>): Field<FontWeightValue>
function fontWeightField(params: Partial<Field<FontWeightValue>> = {}): Field<FontWeightValue> {
	const label = params.label ?? fieldLabel("fw")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<Select
						wrapper={ false }
						name={ name }
						value={ value === undefined ? undefined : String(value) }
						options={ fontWeightSelectOptions(t) }
						onChange={ (nextValue) => {
							if(nextValue === null) {
								return
							}
							const weight = parseFontWeight(nextValue)
							if(weight !== undefined) {
								onChange(weight)
							}
						} }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

function textDecorationField(): Field<TextDecorationValue>
function textDecorationField(params: Partial<Field<TextDecorationValue>>): Field<TextDecorationValue>
function textDecorationField(params: Partial<Field<TextDecorationValue>> = {}): Field<TextDecorationValue> {
	const label = params.label ?? fieldLabel("td")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return iconFieldRender({
				label,
				name,
				value,
				className: classes.typographyIcons,
				isValue: isTextDecorationValue,
				onChange,
				options: [
					{ value: "none", label: <FontNormalIcon />, tooltip: fieldLabel("decoration.none") },
					{ value: "underline", label: <FontUnderlineIcon />, tooltip: fieldLabel("decoration.underline") },
					{ value: "line-through", label: <FontStrikeIcon />, tooltip: fieldLabel("decoration.line_through") },
					{ value: "overline", label: <FontOverlineIcon />, tooltip: fieldLabel("decoration.overline") },
				],
			})
		},
	}
}

function textTransformField(): Field<TextTransformValue>
function textTransformField(params: Partial<Field<TextTransformValue>>): Field<TextTransformValue>
function textTransformField(params: Partial<Field<TextTransformValue>> = {}): Field<TextTransformValue> {
	const label = params.label ?? fieldLabel("tt")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return iconFieldRender({
				label,
				name,
				value,
				className: classes.typographyIcons,
				isValue: isTextTransformValue,
				onChange,
				options: [
					{ value: "none", label: <FontNormalIcon />, tooltip: fieldLabel("transform.none") },
					{ value: "uppercase", label: <TextUppercaseIcon />, tooltip: fieldLabel("transform.uppercase") },
					{ value: "lowercase", label: <TextLowercaseIcon />, tooltip: fieldLabel("transform.lowercase") },
					{ value: "capitalize", label: <TextCapitalizeIcon />, tooltip: fieldLabel("transform.capitalize") },
				],
			})
		},
	}
}

function fontStyleField(): Field<FontStyleValue>
function fontStyleField(params: Partial<Field<FontStyleValue>>): Field<FontStyleValue>
function fontStyleField(params: Partial<Field<FontStyleValue>> = {}): Field<FontStyleValue> {
	const label = params.label ?? fieldLabel("fs")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return iconFieldRender({
				label,
				name,
				value,
				className: classes.typographyIcons,
				isValue: isFontStyleValue,
				onChange,
				options: [
					{ value: "normal", label: <FontNormalIcon />, tooltip: fieldLabel("style.normal") },
					{ value: "italic", label: <FontItalicIcon />, tooltip: fieldLabel("style.italic") },
				],
			})
		},
	}
}

function fontSizeField(): Field<FontSizeValue>
function fontSizeField(params: Partial<Field<FontSizeValue>>): Field<FontSizeValue>
function fontSizeField(params: Partial<Field<FontSizeValue>> = {}): Field<FontSizeValue> {
	const label = params.label ?? fieldLabel("size")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<Select
						wrapper={ false }
						name={ name }
						value={ value }
						options={ [
							{ label: "xs", value: "xs" },
							{ label: "sm", value: "sm" },
							{ label: "md", value: "md" },
							{ label: "lg", value: "lg" },
							{ label: "xl", value: "xl" },
						] }
						onChange={ (nextValue) => {
							if(nextValue && isFontSizeValue(nextValue)) {
								onChange(nextValue)
							}
						} }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

function titleSizeField(): Field<TitleSizeValue>
function titleSizeField(params: Partial<Field<TitleSizeValue>>): Field<TitleSizeValue>
function titleSizeField(params: Partial<Field<TitleSizeValue>> = {}): Field<TitleSizeValue> {
	const label = params.label ?? fieldLabel("size")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<Select
						wrapper={ false }
						name={ name }
						value={ value }
						options={ [
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
						] }
						onChange={ (nextValue) => {
							if(nextValue && isTitleSizeValue(nextValue)) {
								onChange(nextValue)
							}
						} }
					/>
				</PuckFieldLabel>
			)
		},
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
