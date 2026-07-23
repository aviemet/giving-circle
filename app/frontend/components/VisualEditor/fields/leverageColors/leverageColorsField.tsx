import { type Field } from "@puckeditor/core"
import { useState } from "react"

import { ColorInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	defaultLeverageColors,
	normalizeLeverageColors,
	type LeverageColorsValue,
} from "./leverageColors"
import * as classes from "./leverageColorsField.css"
import { FieldRow, PuckFieldLabel, UnitNumber } from "../shared"

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

function colorsText(key: string) {
	return i18n.t(`slides.editor.fields.leverage_colors.${key}`)
}

interface LeverageColorsFieldControlProps {
	name: string
	value: LeverageColorsValue | undefined
	onChange: (value: LeverageColorsValue) => void
}

function LeverageColorsFieldControl({
	name,
	value,
	onChange,
}: LeverageColorsFieldControlProps) {
	const [localValue, setLocalValue] = useState<LeverageColorsValue>(
		() => normalizeLeverageColors(value),
	)

	const updateValue = (patch: Partial<LeverageColorsValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.colorsRoot }>
			<FieldRow label={ colorsText("labels.remaining") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.remainingColor` }
					value={ localValue.remainingColor }
					onChange={ (remainingColor) => updateValue({ remainingColor }) }
					swatches={ COLOR_SWATCHES }
				/>
			</FieldRow>
			<FieldRow label={ colorsText("labels.track") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.trackColor` }
					value={ localValue.trackColor }
					onChange={ (trackColor) => updateValue({ trackColor }) }
					swatches={ COLOR_SWATCHES }
				/>
			</FieldRow>
			<FieldRow label={ colorsText("labels.radius") }>
				<UnitNumber
					name={ `${name}.borderRadius` }
					value={ localValue.borderRadius }
					onChange={ (borderRadius) => updateValue({ borderRadius }) }
				/>
			</FieldRow>
		</div>
	)
}

function leverageColorsField(): Field<LeverageColorsValue | undefined> {
	const label = colorsText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<LeverageColorsFieldControl
						name={ name }
						value={ value ?? defaultLeverageColors() }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { leverageColorsField }
