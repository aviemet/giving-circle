import { clsx } from "clsx"

import { Box } from "@/components"

import { type TimerComponentProps } from "./Timer"
import {
	Timer as TimerElement,
	useTimerCountdown,
	useTimerEffectiveDurationSeconds,
} from "../../elements/Timer"
import * as elementClasses from "../../elements/Timer/Timer.css"
import {
	defaultTextFontValue,
	normalizeTimerColors,
	normalizeTimerDuration,
	normalizeTimerExhausted,
	timerDurationToSeconds,
} from "../../fields"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"

export function TimerDisplay({
	id: elementId,
	displayType,
	duration,
	colors,
	font,
	exhausted,
	sizing,
}: TimerComponentProps) {
	const resolvedDuration = normalizeTimerDuration(duration)
	const resolvedColors = normalizeTimerColors(colors)
	const resolvedExhausted = normalizeTimerExhausted(exhausted)
	const resolvedFont = font ?? defaultTextFontValue({
		color: "#FFFFFF",
		sizePreset: "4xl",
	})
	const durationTotalSeconds = timerDurationToSeconds(resolvedDuration)
	const effectiveDurationSeconds = useTimerEffectiveDurationSeconds({
		elementId,
		designedDurationSeconds: durationTotalSeconds,
	})
	const remainingSeconds = useTimerCountdown({
		elementId,
		designedDurationSeconds: durationTotalSeconds,
	})

	return (
		<Box
			className={ clsx(elementClasses.host) }
			style={ buildFlexItemSizingStyle(sizing ?? { mode: "fill" }) }
		>
			<TimerElement
				remainingSeconds={ remainingSeconds }
				durationSeconds={ effectiveDurationSeconds }
				displayType={ displayType }
				colors={ resolvedColors }
				font={ resolvedFont }
				exhaustedMode={ resolvedExhausted.mode }
				exhaustedMessage={ resolvedExhausted.message }
			/>
		</Box>
	)
}
