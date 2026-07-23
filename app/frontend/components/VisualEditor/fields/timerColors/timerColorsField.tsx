import { type Field } from "@puckeditor/core"
import { useState } from "react"

import { ColorInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	defaultTimerColors,
	normalizeTimerColors,
	type TimerColorsValue,
} from "./timerColors"
import * as classes from "./timerColorsField.css"
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

function colorsText(key: string) {
	return i18n.t(`slides.editor.fields.timer_colors.${key}`)
}

interface TimerColorsFieldControlProps {
	name: string
	value: TimerColorsValue | undefined
	onChange: (value: TimerColorsValue) => void
}

function TimerColorsFieldControl({
	name,
	value,
	onChange,
}: TimerColorsFieldControlProps) {
	const [localValue, setLocalValue] = useState<TimerColorsValue>(
		() => normalizeTimerColors(value),
	)

	const updateValue = (patch: Partial<TimerColorsValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.colorsRoot }>
			<FieldRow label={ colorsText("labels.ring_track") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.ringTrackColor` }
					value={ localValue.ringTrackColor }
					onChange={ (ringTrackColor) => updateValue({ ringTrackColor }) }
					swatches={ COLOR_SWATCHES }
				/>
			</FieldRow>
			<FieldRow label={ colorsText("labels.ring_progress") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.ringProgressColor` }
					value={ localValue.ringProgressColor }
					onChange={ (ringProgressColor) => updateValue({ ringProgressColor }) }
					swatches={ COLOR_SWATCHES }
				/>
			</FieldRow>
		</div>
	)
}

export function timerColorsField(): Field<TimerColorsValue | undefined> {
	const label = colorsText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TimerColorsFieldControl
						name={ name }
						value={ value ?? defaultTimerColors() }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

