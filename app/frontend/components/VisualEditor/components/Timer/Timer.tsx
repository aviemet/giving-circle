import { type PuckComponent } from "@puckeditor/core"

import { TimerDisplay } from "./TimerDisplay"
import { TimerEditor } from "./TimerEditor"
import { type TimerDisplayType } from "../../elements/Timer"
import {
	type FlexItemSizing,
	type TextFontValue,
	type TimerColorsValue,
	type TimerDurationValue,
	type TimerExhaustedValue,
} from "../../fields"

export type TimerProps = {
	displayType: TimerDisplayType
	duration?: TimerDurationValue
	colors?: TimerColorsValue
	font?: TextFontValue
	exhausted?: TimerExhaustedValue
	sizing?: FlexItemSizing
}

export type TimerComponentProps = Parameters<PuckComponent<TimerProps>>[0]

export function Timer(props: TimerComponentProps) {
	return props.puck.isEditing
		? <TimerEditor { ...props } />
		: <TimerDisplay { ...props } />
}
