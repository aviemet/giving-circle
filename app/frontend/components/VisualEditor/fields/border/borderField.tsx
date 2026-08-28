import { Field } from "@puckeditor/core"
import { useState } from "react"

import { ColorInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import { normalizeBorderValue } from "./border"
import * as classes from "./borderField.css"
import { type BorderProps } from "./style"
import { FieldRow, PuckFieldLabel, UnitNumber } from "../shared"
import {
	BORDER_RADIUS_UNITS,
	BORDER_WIDTH_UNITS,
	coerceLength,
	isLengthUnit,
	lengthAmount,
} from "../shared/length"

function borderText(key: string) {
	return i18n.t(`slides.editor.fields.border.${key}`)
}

interface BorderFieldControlProps {
	name: string
	value: Partial<BorderProps> | undefined
	onChange: (value: BorderProps) => void
}

function BorderFieldControl({
	name,
	value,
	onChange,
}: BorderFieldControlProps) {
	const [localValue, setLocalValue] = useState<BorderProps>(() => normalizeBorderValue(value))

	const updateValue = (patch: Partial<BorderProps>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	const borderWidth = coerceLength(localValue.borderWidth ?? 0, BORDER_WIDTH_UNITS, "px")
	const borderRadius = coerceLength(localValue.borderRadius ?? 0, BORDER_RADIUS_UNITS, "px")

	return (
		<div className={ classes.borderRoot }>
			<FieldRow label={ borderText("width") }>
				<UnitNumber
					name={ `${name}.borderWidth` }
					value={ lengthAmount(borderWidth) }
					unit={ borderWidth.unit }
					units={ BORDER_WIDTH_UNITS }
					onChange={ (amount) => updateValue({
						borderWidth: { amount, unit: borderWidth.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, BORDER_WIDTH_UNITS)) {
							return
						}
						updateValue({
							borderWidth: { amount: borderWidth.amount, unit },
						})
					} }
				/>
			</FieldRow>

			<FieldRow label={ borderText("radius") }>
				<UnitNumber
					name={ `${name}.borderRadius` }
					value={ lengthAmount(borderRadius) }
					unit={ borderRadius.unit }
					units={ BORDER_RADIUS_UNITS }
					onChange={ (amount) => updateValue({
						borderRadius: { amount, unit: borderRadius.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, BORDER_RADIUS_UNITS)) {
							return
						}
						updateValue({
							borderRadius: { amount: borderRadius.amount, unit },
						})
					} }
				/>
			</FieldRow>

			<FieldRow label={ borderText("color") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.borderColor` }
					value={ localValue.borderColor ?? "" }
					clearable
					onChange={ (borderColor) => updateValue({ borderColor }) }
					swatches={ [
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
					] }
				/>
			</FieldRow>
		</div>
	)
}

function borderField(): Field<BorderProps | undefined>
function borderField(params: { label?: string }): Field<BorderProps | undefined>
function borderField({
	label,
}: { label?: string } = {}): Field<BorderProps | undefined> {
	return {
		type: "custom",
		label: label ?? borderText("label"),
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label ?? borderText("label") }>
					<BorderFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { borderField }
