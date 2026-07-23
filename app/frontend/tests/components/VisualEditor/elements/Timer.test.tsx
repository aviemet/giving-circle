import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import {
	Timer,
	flipClockDigits,
	formatTimerSeconds,
	remainingFraction,
} from "@/components/VisualEditor/elements/Timer"

const defaultColors = {
	ringTrackColor: "#333333",
	ringProgressColor: "#FFFFFF",
}

describe("components/VisualEditor/elements/Timer/timerFormat", () => {
	test("formats minutes and hours", () => {
		expect(formatTimerSeconds(595)).toBe("9:55")
		expect(formatTimerSeconds(0)).toBe("0:00")
		expect(formatTimerSeconds(3661)).toBe("1:01:01")
	})

	test("remainingFraction clamps between 0 and 1", () => {
		expect(remainingFraction(30, 60)).toBe(0.5)
		expect(remainingFraction(0, 60)).toBe(0)
		expect(remainingFraction(90, 60)).toBe(1)
		expect(remainingFraction(10, 0)).toBe(0)
	})

	test("flipClockDigits pads units for flip cards", () => {
		expect(flipClockDigits(595)).toEqual({
			digits: [0, 9, 5, 5],
			separators: [1],
		})
		expect(flipClockDigits(3661)).toEqual({
			digits: [0, 1, 0, 1, 0, 1],
			separators: [1, 3],
		})
	})
})

describe("components/VisualEditor/elements/Timer", () => {
	test("renders digital countdown", () => {
		render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 595 }
					durationSeconds={ 600 }
					displayType="digital"
					colors={ defaultColors }
					exhaustedMode="zero"
					exhaustedMessage="Done"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("9:55")).toBeTruthy()
	})

	test("renders circle countdown with remaining time", () => {
		const { container } = render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 595 }
					durationSeconds={ 600 }
					displayType="circle"
					colors={ defaultColors }
					exhaustedMode="zero"
					exhaustedMessage="Done"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("9:55")).toBeTruthy()
		expect(container.querySelector("svg")).toBeTruthy()
		expect(container.querySelectorAll("circle")).toHaveLength(2)
	})

	test("renders flip countdown cards", () => {
		const { container } = render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 595 }
					durationSeconds={ 600 }
					displayType="flip"
					colors={ defaultColors }
					exhaustedMode="zero"
					exhaustedMessage="Done"
				/>
			</MantineProvider>,
		)

		expect(container.querySelector("[class*=\"fcp__container\"]")).toBeTruthy()
		expect(container.querySelectorAll("[class*=\"fcp__digit_block\"]").length).toBeGreaterThanOrEqual(4)
	})

	test("renders seven-segment countdown digits", () => {
		const { container } = render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 595 }
					durationSeconds={ 600 }
					displayType="sevenSegment"
					colors={ defaultColors }
					exhaustedMode="zero"
					exhaustedMessage="Done"
				/>
			</MantineProvider>,
		)

		expect(container.querySelectorAll("[class*=\"digit\"]").length).toBeGreaterThan(0)
	})

	test("shows custom message when exhausted", () => {
		render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 0 }
					durationSeconds={ 600 }
					displayType="digital"
					colors={ defaultColors }
					exhaustedMode="message"
					exhaustedMessage="Time is up"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("Time is up")).toBeTruthy()
	})

	test("shows exhausted message for flip display type", () => {
		render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 0 }
					durationSeconds={ 600 }
					displayType="flip"
					colors={ defaultColors }
					exhaustedMode="message"
					exhaustedMessage="Time is up"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("Time is up")).toBeTruthy()
	})

	test("shows zero when exhausted in zero mode", () => {
		render(
			<MantineProvider>
				<Timer
					remainingSeconds={ 0 }
					durationSeconds={ 600 }
					displayType="digital"
					colors={ defaultColors }
					exhaustedMode="zero"
					exhaustedMessage="Time is up"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("0:00")).toBeTruthy()
	})
})

describe("components/VisualEditor/puck.config timer", () => {
	test("registers Timer in the elements category", async () => {
		const { config } = await import("@/components/VisualEditor/puck.config")

		expect(config.categories?.elements?.components).toContain("Timer")
		expect(config.components?.Timer).toBeDefined()
	}, 35000)
})
