import { renderHook } from "@testing-library/react"
import { type ReactNode } from "react"
import { describe, expect, test, vi } from "vitest"

import { useTimerEffectiveDurationSeconds } from "@/components/VisualEditor/elements/Timer/useTimerCountdown"
import { ActiveSlideProvider } from "@/features/presentation/ActiveSlideProvider"

vi.mock("@/features/presentation/PresentationDataProvider", () => ({
	usePresentationDataContext: () => ({
		isEditor: false,
		elementControls: {
			"slide-1": {
				"timer-1": {
					Timer: {
						duration: { minutes: 2, seconds: 15 },
					},
				},
			},
		},
	}),
}))

describe("VisualEditor/elements/Timer/useTimerEffectiveDurationSeconds", () => {
	test("uses the live override when present", () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<ActiveSlideProvider slideId="slide-1">
				{ children }
			</ActiveSlideProvider>
		)

		const { result } = renderHook(
			() => useTimerEffectiveDurationSeconds({
				elementId: "timer-1",
				designedDurationSeconds: 600,
			}),
			{ wrapper },
		)

		expect(result.current).toBe(135)
	})

	test("falls back to the designed duration when no override exists", () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<ActiveSlideProvider slideId="slide-1">
				{ children }
			</ActiveSlideProvider>
		)

		const { result } = renderHook(
			() => useTimerEffectiveDurationSeconds({
				elementId: "missing-timer",
				designedDurationSeconds: 600,
			}),
			{ wrapper },
		)

		expect(result.current).toBe(600)
	})
})
