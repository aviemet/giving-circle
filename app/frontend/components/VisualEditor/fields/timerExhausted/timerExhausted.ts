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
): TimerExhaustedValue {
	const defaults = defaultTimerExhausted()

	return {
		mode: value?.mode ?? defaults.mode,
		message: value?.message ?? defaults.message,
	}
}
