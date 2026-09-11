export type TimerColorsValue = {
	ringTrackColor: string
	ringProgressColor: string
}

export function defaultTimerColors(): TimerColorsValue {
	return {
		ringTrackColor: "#333333",
		ringProgressColor: "#FFFFFF",
	}
}

export function normalizeTimerColors(
	value: Partial<TimerColorsValue> | undefined,
): TimerColorsValue {
	const defaults = defaultTimerColors()

	return {
		ringTrackColor: value?.ringTrackColor ?? defaults.ringTrackColor,
		ringProgressColor: value?.ringProgressColor ?? defaults.ringProgressColor,
	}
}
