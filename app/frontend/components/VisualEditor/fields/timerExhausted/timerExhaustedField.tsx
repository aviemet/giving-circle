import { type Field } from "@puckeditor/core"
import { useState } from "react"

import { TextInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	defaultTimerExhausted,
	normalizeTimerExhausted,
	type TimerExhaustedValue,
} from "./timerExhausted"
import * as classes from "./timerExhaustedField.css"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

function exhaustedText(key: string) {
	return i18n.t(`slides.editor.fields.timer_exhausted.${key}`)
}

interface TimerExhaustedFieldControlProps {
	name: string
	value: TimerExhaustedValue | undefined
	onChange: (value: TimerExhaustedValue) => void
}

function TimerExhaustedFieldControl({
	name,
	value,
	onChange,
}: TimerExhaustedFieldControlProps) {
	const [localValue, setLocalValue] = useState<TimerExhaustedValue>(
		() => normalizeTimerExhausted(value),
	)

	const updateValue = (patch: Partial<TimerExhaustedValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.exhaustedRoot }>
			<FieldRow label={ exhaustedText("labels.mode") }>
				<IconSegmented
					className={ classes.modeSegmented }
					name={ `${name}.mode` }
					value={ localValue.mode }
					options={ [
						{
							value: "zero",
							label: exhaustedText("modes.zero"),
							tooltip: exhaustedText("hints.zero"),
						},
						{
							value: "message",
							label: exhaustedText("modes.message"),
							tooltip: exhaustedText("hints.message"),
						},
					] }
					onChange={ (nextValue) => {
						if(nextValue === "zero" || nextValue === "message") {
							updateValue({ mode: nextValue })
						}
					} }
				/>
			</FieldRow>
			{ localValue.mode === "message" && (
				<FieldRow label={ exhaustedText("labels.message") }>
					<TextInput
						wrapper={ false }
						name={ `${name}.message` }
						value={ localValue.message }
						onChange={ (event) => updateValue({ message: event.currentTarget.value }) }
					/>
				</FieldRow>
			) }
		</div>
	)
}

export function timerExhaustedField(): Field<TimerExhaustedValue | undefined> {
	const label = exhaustedText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TimerExhaustedFieldControl
						name={ name }
						value={ value ?? defaultTimerExhausted() }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}
