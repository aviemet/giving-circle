import { type Field } from "@puckeditor/core"
import { useState } from "react"

import { NumberInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	defaultTimerDuration,
	normalizeTimerDuration,
	type TimerDurationValue,
} from "./timerDuration"
import * as classes from "./timerDurationField.css"
import { FieldRow, PuckFieldLabel } from "../shared"

function durationText(key: string) {
	return i18n.t(`slides.editor.fields.timer_duration.${key}`)
}

interface TimerDurationFieldControlProps {
	name: string
	value: TimerDurationValue | undefined
	onChange: (value: TimerDurationValue) => void
}

function TimerDurationFieldControl({
	name,
	value,
	onChange,
}: TimerDurationFieldControlProps) {
	const [localValue, setLocalValue] = useState<TimerDurationValue>(
		() => normalizeTimerDuration(value),
	)

	const updateValue = (patch: Partial<TimerDurationValue>) => {
		const next = normalizeTimerDuration({
			...localValue,
			...patch,
		})
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.durationRoot }>
			<FieldRow label={ durationText("labels.minutes") }>
				<NumberInput
					wrapper={ false }
					name={ `${name}.minutes` }
					value={ localValue.minutes }
					min={ 0 }
					step={ 1 }
					onChange={ (nextValue) => {
						const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
						updateValue({ minutes: Number.isNaN(numericValue) ? 0 : numericValue })
					} }
				/>
			</FieldRow>
			<FieldRow label={ durationText("labels.seconds") }>
				<NumberInput
					wrapper={ false }
					name={ `${name}.seconds` }
					value={ localValue.seconds }
					min={ 0 }
					max={ 59 }
					step={ 1 }
					onChange={ (nextValue) => {
						const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
						updateValue({ seconds: Number.isNaN(numericValue) ? 0 : numericValue })
					} }
				/>
			</FieldRow>
		</div>
	)
}

export function timerDurationField(): Field<TimerDurationValue | undefined> {
	const label = durationText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TimerDurationFieldControl
						name={ name }
						value={ value ?? defaultTimerDuration() }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

