import { type Field } from "@puckeditor/core"
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
	isFontStyleValue,
	isTextDecorationValue,
	isTextTransformValue,
	type FontWeightValue,
} from "./fields"
import { fontWeightSelectOptions, parseFontWeight } from "./fontWeightOptions"
import { defaultTypeStyle, normalizeTypeStyle, type TypeStyleValue } from "./typeStyle"
import * as classes from "./typographyControls.css"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

function styleText(key: string) {
	return i18n.t(`slides.editor.fields.typography.${key}`)
}

interface TypeStyleFieldControlProps {
	name: string
	value: TypeStyleValue | undefined
	onChange: (value: TypeStyleValue) => void
	fallbackWeight: FontWeightValue
}

function TypeStyleFieldControl({
	name,
	value,
	onChange,
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
			<FieldRow label={ styleText("labels.weight") }>
				<Select
					wrapper={ false }
					name={ `${name}.fw` }
					value={ String(localValue.fw) }
					options={ fontWeightSelectOptions() }
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

			<FieldRow label={ styleText("labels.decoration") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.td` }
					value={ localValue.td }
					options={ [
						{ value: "none", label: <FontNormalIcon />, tooltip: styleText("decoration.none") },
						{ value: "underline", label: <FontUnderlineIcon />, tooltip: styleText("decoration.underline") },
						{ value: "line-through", label: <FontStrikeIcon />, tooltip: styleText("decoration.line_through") },
						{ value: "overline", label: <FontOverlineIcon />, tooltip: styleText("decoration.overline") },
					] }
					onChange={ (nextValue) => {
						if(isTextDecorationValue(nextValue)) {
							updateValue({ td: nextValue })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ styleText("labels.transform") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.tt` }
					value={ localValue.tt }
					options={ [
						{ value: "none", label: <FontNormalIcon />, tooltip: styleText("transform.none") },
						{ value: "uppercase", label: <TextUppercaseIcon />, tooltip: styleText("transform.uppercase") },
						{ value: "lowercase", label: <TextLowercaseIcon />, tooltip: styleText("transform.lowercase") },
						{ value: "capitalize", label: <TextCapitalizeIcon />, tooltip: styleText("transform.capitalize") },
					] }
					onChange={ (nextValue) => {
						if(isTextTransformValue(nextValue)) {
							updateValue({ tt: nextValue })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ styleText("labels.style") }>
				<IconSegmented
					className={ classes.typographyIcons }
					name={ `${name}.fs` }
					value={ localValue.fs }
					options={ [
						{ value: "normal", label: <FontNormalIcon />, tooltip: styleText("style.normal") },
						{ value: "italic", label: <FontItalicIcon />, tooltip: styleText("style.italic") },
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

export function typeStyleField(params: {
	fallbackWeight?: FontWeightValue
} = {}): Field<TypeStyleValue | undefined> {
	const fallbackWeight = params.fallbackWeight ?? 400
	const label = styleText("label")

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
						fallbackWeight={ fallbackWeight }
					/>
				</PuckFieldLabel>
			)
		},
	}
}
