import { describe, expect, test } from "vitest"

import {
	defaultTimerDuration,
	normalizeTimerDuration,
	timerDurationToSeconds,
} from "@/components/VisualEditor/fields/timerDuration/timerDuration"
import {
	defaultTimerColors,
	normalizeTimerColors,
} from "@/components/VisualEditor/fields/timerColors/timerColors"
import {
	defaultTimerExhausted,
	normalizeTimerExhausted,
} from "@/components/VisualEditor/fields/timerExhausted/timerExhausted"

describe("VisualEditor timer helpers", () => {
	test("normalizes duration and converts to seconds", () => {
		expect(defaultTimerDuration()).toEqual({ minutes: 10, seconds: 0 })
		expect(normalizeTimerDuration({ minutes: 1, seconds: 90 })).toEqual({ minutes: 1, seconds: 59 })
		expect(normalizeTimerDuration(undefined, { durationMinutes: 2, durationSeconds: 15 })).toEqual({
			minutes: 2,
			seconds: 15,
		})
		expect(timerDurationToSeconds({ minutes: 1, seconds: 30 })).toBe(90)
	})

	test("normalizes timer colors", () => {
		expect(defaultTimerColors().ringTrackColor).toBe("#333333")
		expect(normalizeTimerColors({ ringProgressColor: "#ABC" }).ringProgressColor).toBe("#ABC")
		expect(normalizeTimerColors(undefined, { ringTrackColor: "#111" }).ringTrackColor).toBe("#111")
	})

	test("normalizes exhausted mode", () => {
		expect(defaultTimerExhausted().mode).toBe("zero")
		expect(normalizeTimerExhausted({ mode: "message", message: "Done" })).toEqual({
			mode: "message",
			message: "Done",
		})
		expect(normalizeTimerExhausted(undefined, {
			exhaustedMode: "message",
			exhaustedMessage: "Over",
		}).message).toBe("Over")
	})
})
