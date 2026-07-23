import { type Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useState } from "react"

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

import {
	type FontStyleValue,
	type FontWeightValue,
	type TextDecorationValue,
	type TextTransformValue,
} from "./fields"
import { fontWeightSelectOptions, parseFontWeight } from "./fontWeightOptions"
import { defaultTypeStyle, normalizeTypeStyle, type TypeStyleValue } from "./typeStyle"
import * as classes from "./typographyControls.css"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

function styleText(t: TFunction, key: string) {
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

interface TypeStyleFieldControlProps {
	name: string
	value: TypeStyleValue | undefined
	onChange: (value: TypeStyleValue) => void
	t: TFunction
	fallbackWeight: FontWeightValue
}

function TypeStyleFieldControl({
	name,
	value,
	onChange,
	t,
	fallbackWeight,
}: TypeStyleFieldControlProps) {
	const [localValue, setLocalValue] = useState<TypeStyleValue>(() => {
		return normalizeTypeStyle(value, undefined, fallbackWeight)
	})

	const updateValue = (patch: Partial<TypeStyleValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.typographyStack }>
			<FieldRow label={ styleText(t, "labels.weight") }>
				<Select
					wrapper={ false }
					name={ `${name}.fw` }
					value={ String(localValue.fw) }
					options={ fontWeightSelectOptions(t) }
					onChange={ (nextValue) => {
						if(nextValue === null) {
							return
						}
						const weight = parseFontWeight(nextValue)
						if(weight !== undefined) {
							updateValue({ fw: weight })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ styleText(t, "labels.decoration") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.td` }
					value={ localValue.td }
					options={ [
						{ value: "none", label: <FontNormalIcon />, tooltip: styleText(t, "decoration.none") },
						{ value: "underline", label: <FontUnderlineIcon />, tooltip: styleText(t, "decoration.underline") },
						{ value: "line-through", label: <FontStrikeIcon />, tooltip: styleText(t, "decoration.line_through") },
						{ value: "overline", label: <FontOverlineIcon />, tooltip: styleText(t, "decoration.overline") },
					] }
					onChange={ (nextValue) => {
						if(isTextDecorationValue(nextValue)) {
							updateValue({ td: nextValue })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ styleText(t, "labels.transform") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.tt` }
					value={ localValue.tt }
					options={ [
						{ value: "none", label: <FontNormalIcon />, tooltip: styleText(t, "transform.none") },
						{ value: "uppercase", label: <TextUppercaseIcon />, tooltip: styleText(t, "transform.uppercase") },
						{ value: "lowercase", label: <TextLowercaseIcon />, tooltip: styleText(t, "transform.lowercase") },
						{ value: "capitalize", label: <TextCapitalizeIcon />, tooltip: styleText(t, "transform.capitalize") },
					] }
					onChange={ (nextValue) => {
						if(isTextTransformValue(nextValue)) {
							updateValue({ tt: nextValue })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ styleText(t, "labels.style") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.fs` }
					value={ localValue.fs }
					options={ [
						{ value: "normal", label: <FontNormalIcon />, tooltip: styleText(t, "style.normal") },
						{ value: "italic", label: <FontItalicIcon />, tooltip: styleText(t, "style.italic") },
					] }
					onChange={ (nextValue) => {
						if(isFontStyleValue(nextValue)) {
							updateValue({ fs: nextValue })
						}
					} }
				/>
			</FieldRow>
		</div>
	)
}

function typeStyleField(params: {
	t?: TFunction
	fallbackWeight?: FontWeightValue
} = {}): Field<TypeStyleValue | undefined> {
	const t = params.t ?? i18n.t.bind(i18n)
	const fallbackWeight = params.fallbackWeight ?? 400
	const label = styleText(t, "label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TypeStyleFieldControl
						name={ name }
						value={ value ?? defaultTypeStyle(fallbackWeight) }
						onChange={ onChange }
						t={ t }
						fallbackWeight={ fallbackWeight }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { typeStyleField }
