export type TimerDurationValue = {
	minutes: number
	seconds: number
}

export function defaultTimerDuration(): TimerDurationValue {
	return {
		minutes: 10,
		seconds: 0,
	}
}

export function normalizeTimerDuration(
	value: Partial<TimerDurationValue> | undefined,
	legacy?: {
		durationMinutes?: number
		durationSeconds?: number
	},
): TimerDurationValue {
	const defaults = defaultTimerDuration()
	const minutesRaw = value?.minutes ?? legacy?.durationMinutes ?? defaults.minutes
	const secondsRaw = value?.seconds ?? legacy?.durationSeconds ?? defaults.seconds
	const minutes = Number.isFinite(minutesRaw) ? Math.max(0, Math.floor(minutesRaw)) : 0
	const seconds = Number.isFinite(secondsRaw) ? Math.max(0, Math.min(59, Math.floor(secondsRaw))) : 0

	return {
		minutes,
		seconds,
	}
}

export function timerDurationToSeconds(value: TimerDurationValue) {
	return (value.minutes * 60) + value.seconds
}
