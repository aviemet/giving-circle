export type TimerDisplayType = "circle" | "digital" | "flip" | "sevenSegment"

export type TimerExhaustedMode = "zero" | "message"

export function isTimerDisplayType(value: string): value is TimerDisplayType {
	return value === "circle"
		|| value === "digital"
		|| value === "flip"
		|| value === "sevenSegment"
}

export function formatTimerSeconds(totalSeconds: number) {
	const safeSeconds = Math.max(0, Math.floor(totalSeconds))
	const hours = Math.floor(safeSeconds / 3600)
	const minutes = Math.floor((safeSeconds % 3600) / 60)
	const seconds = safeSeconds % 60
	const paddedSeconds = String(seconds).padStart(2, "0")

	if(hours > 0) {
		const paddedMinutes = String(minutes).padStart(2, "0")
		return `${hours}:${paddedMinutes}:${paddedSeconds}`
	}

	return `${minutes}:${paddedSeconds}`
}

export function remainingFraction(remainingSeconds: number, durationSeconds: number) {
	if(durationSeconds <= 0) {
		return 0
	}

	return Math.min(Math.max(remainingSeconds / durationSeconds, 0), 1)
}

function twoDigitValues(value: number) {
	const clamped = Math.max(0, Math.min(99, Math.floor(value)))

	return [Math.floor(clamped / 10), clamped % 10]
}

export function flipClockDigits(totalSeconds: number) {
	const safeSeconds = Math.max(0, Math.floor(totalSeconds))
	const hours = Math.floor(safeSeconds / 3600)
	const minutes = Math.floor((safeSeconds % 3600) / 60)
	const seconds = safeSeconds % 60

	if(hours > 0) {
		return {
			digits: [
				...twoDigitValues(hours),
				...twoDigitValues(minutes),
				...twoDigitValues(seconds),
			],
			separators: [1, 3],
		}
	}

	return {
		digits: [
			...twoDigitValues(minutes),
			...twoDigitValues(seconds),
		],
		separators: [1],
	}
}
