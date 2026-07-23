import { type Field } from "@puckeditor/core"

import {
	isTimerDisplayType,
	type TimerDisplayType,
} from "@/components/VisualEditor/elements/Timer/timerFormat"
import { i18n } from "@/lib/i18n"

import * as classes from "./timerDisplayField.css"
import { IconSegmented, PuckFieldLabel } from "../shared"

function displayText(key: string) {
	return i18n.t(`slides.editor.fields.timer_display.${key}`)
}

export function timerDisplayField(): Field<TimerDisplayType> {
	const label = displayText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<div className={ classes.displayRoot }>
						<IconSegmented
							className={ classes.displaySegmented }
							name={ name }
							value={ value }
							options={ [
								{
									value: "circle",
									label: displayText("options.circle"),
									tooltip: displayText("hints.circle"),
								},
								{
									value: "digital",
									label: displayText("options.digital"),
									tooltip: displayText("hints.digital"),
								},
								{
									value: "flip",
									label: displayText("options.flip"),
									tooltip: displayText("hints.flip"),
								},
								{
									value: "sevenSegment",
									label: displayText("options.seven_segment"),
									tooltip: displayText("hints.seven_segment"),
								},
							] }
							onChange={ (nextValue) => {
								if(isTimerDisplayType(nextValue)) {
									onChange(nextValue)
								}
							} }
						/>
					</div>
				</PuckFieldLabel>
			)
		},
	}
}

