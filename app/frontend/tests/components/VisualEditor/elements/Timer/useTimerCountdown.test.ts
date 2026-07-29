import { act, renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import { useLocalCountdown } from "@/components/VisualEditor/elements/Timer/useTimerCountdown"

describe("VisualEditor/elements/Timer/useTimerCountdown", () => {
	test("counts down while running and resets when duration changes", () => {
		vi.useFakeTimers()
		const { result, rerender } = renderHook(
			({ duration, running }) => useLocalCountdown(duration, running),
			{ initialProps: { duration: 3, running: true } },
		)

		expect(result.current).toBe(3)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(result.current).toBe(2)

		rerender({ duration: 10, running: true })
		expect(result.current).toBe(10)

		rerender({ duration: 10, running: false })
		act(() => {
			vi.advanceTimersByTime(2000)
		})
		expect(result.current).toBe(10)

		vi.useRealTimers()
	})

	test("stops at zero", () => {
		vi.useFakeTimers()
		const { result } = renderHook(() => useLocalCountdown(1, true))

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(result.current).toBe(0)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(result.current).toBe(0)

		vi.useRealTimers()
	})
})
