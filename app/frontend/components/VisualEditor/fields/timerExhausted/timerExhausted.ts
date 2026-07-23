export type TimerExhaustedValue = {
	mode: "zero" | "message"
	message: string
}

export function defaultTimerExhausted(): TimerExhaustedValue {
	return {
		mode: "zero",
		message: "Time's up",
	}
}

export function normalizeTimerExhausted(
	value: Partial<TimerExhaustedValue> | undefined,
	legacy?: {
		exhaustedMode?: "zero" | "message"
		exhaustedMessage?: string
	},
): TimerExhaustedValue {
	const defaults = defaultTimerExhausted()

	return {
		mode: value?.mode ?? legacy?.exhaustedMode ?? defaults.mode,
		message: value?.message ?? legacy?.exhaustedMessage ?? defaults.message,
	}
}
