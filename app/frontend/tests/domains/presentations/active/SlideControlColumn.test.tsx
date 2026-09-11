import { screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { SlideControlColumn } from "@/domains/presentations/active/SlideControlColumn"
import { createSlideData, createSlidePresentation, createTimerPuckNode } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/active/SlideControlColumn", () => {
	test("renders Timer duration override when the slide contains a Timer", () => {
		const slide = createSlidePresentation({
			data: createSlideData({
				content: [createTimerPuckNode("timer-1")],
			}),
		})

		render(
			<SlideControlColumn
				slide={ slide }
				active={ false }
				onSwitch={ () => {} }
				elementControls={ {} }
				circleSlug="circle-slug"
				presentationSlug="presentation-slug"
			/>,
		)

		expect(screen.getByText("Duration override")).toBeTruthy()
		expect(screen.getByText("Timer")).toBeTruthy()
	})

	test("does not render element controls when the slide has no controllable elements", () => {
		const slide = createSlidePresentation({
			data: createSlideData({
				content: [],
			}),
		})

		render(
			<SlideControlColumn
				slide={ slide }
				active={ false }
				onSwitch={ () => {} }
				elementControls={ {} }
				circleSlug="circle-slug"
				presentationSlug="presentation-slug"
			/>,
		)

		expect(screen.queryByText("Duration override")).toBeNull()
	})
})
