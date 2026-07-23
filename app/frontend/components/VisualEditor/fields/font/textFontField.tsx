import { Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useState } from "react"

import { ColorInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import { FontFamilyControls } from "./FontFamilyControls"
import { type FontSizePreset } from "./fontSize"
import { FontSizeControl } from "./FontSizeControl"
import { type FontValue } from "./fontValue"
import {
	defaultTextFontValue,
	normalizeTextFontValue,
	type TextFontValue,
} from "./textFont"
import * as classes from "./textFontField.css"
import { FieldRow, PuckFieldLabel } from "../shared"

const COLOR_SWATCHES = [
	"#2e2e2e",
	"#868e96",
	"#fa5252",
	"#e64980",
	"#be4bdb",
	"#7950f2",
	"#4c6ef5",
	"#228be6",
	"#15aabf",
	"#12b886",
	"#40c057",
	"#82c91e",
	"#fab005",
	"#fd7e14",
	"#ffffff",
	"#000000",
]

function fontText(t: TFunction, key: string) {
	return t(`slides.editor.fields.font.${key}`)
}

interface TextFontFieldControlProps {
	name: string
	value: TextFontValue | undefined
	onChange: (value: TextFontValue) => void
	t: TFunction
	allowInherit: boolean
	allowAutoSize: boolean
	fallbackColor: string
	fallbackSizePreset: FontSizePreset
}

function TextFontFieldControl({
	name,
	value,
	onChange,
	t,
	allowInherit,
	allowAutoSize,
	fallbackColor,
	fallbackSizePreset,
}: TextFontFieldControlProps) {
	const [localValue, setLocalValue] = useState<TextFontValue>(() => {
		return normalizeTextFontValue(value, undefined, {
			color: fallbackColor,
			sizePreset: fallbackSizePreset,
		})
	})

	const commit = (next: TextFontValue) => {
		setLocalValue(next)
		onChange(next)
	}

	const updateFamily = (font: FontValue) => {
		commit({
			...localValue,
			family: font.family,
			url: font.url,
		})
	}

	return (
		<div className={ classes.textFontRoot }>
			<FieldRow label={ fontText(t, "labels.family") }>
				<FontFamilyControls
					name={ `${name}.family` }
					value={ {
						family: localValue.family,
						url: localValue.url,
					} }
					onChange={ updateFamily }
					allowInherit={ allowInherit }
				/>
			</FieldRow>

			<FontSizeControl
				name={ `${name}.size` }
				value={ localValue.size }
				allowAuto={ allowAutoSize }
				t={ t }
				onChange={ (size) => {
					commit({
						...localValue,
						size,
					})
				} }
			/>

			<FieldRow label={ fontText(t, "labels.color") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.color` }
					value={ localValue.color }
					clearable
					onChange={ (color) => {
						commit({
							...localValue,
							color,
						})
					} }
					swatches={ COLOR_SWATCHES }
				/>
			</FieldRow>
		</div>
	)
}

function textFontField(params: {
	t?: TFunction
	allowInherit?: boolean
	allowAutoSize?: boolean
	fallbackColor?: string
	fallbackSizePreset?: FontSizePreset
} = {}): Field<TextFontValue | undefined> {
	const t = params.t ?? i18n.t.bind(i18n)
	const allowInherit = params.allowInherit ?? true
	const allowAutoSize = params.allowAutoSize ?? false
	const fallbackColor = params.fallbackColor ?? "#FFFFFF"
	const fallbackSizePreset = params.fallbackSizePreset
		?? (allowAutoSize ? "auto" : "md")
	const label = fontText(t, "label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TextFontFieldControl
						name={ name }
						value={ value ?? defaultTextFontValue({
							color: fallbackColor,
							sizePreset: fallbackSizePreset,
						}) }
						onChange={ onChange }
						t={ t }
						allowInherit={ allowInherit }
						allowAutoSize={ allowAutoSize }
						fallbackColor={ fallbackColor }
						fallbackSizePreset={ fallbackSizePreset }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { textFontField }
