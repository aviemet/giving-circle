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
	legacy?: {
		ringTrackColor?: string
		ringProgressColor?: string
		textColor?: string
	},
): TimerColorsValue {
	const defaults = defaultTimerColors()

	return {
		ringTrackColor: value?.ringTrackColor
			?? legacy?.ringTrackColor
			?? defaults.ringTrackColor,
		ringProgressColor: value?.ringProgressColor
			?? legacy?.ringProgressColor
			?? defaults.ringProgressColor,
	}
}
