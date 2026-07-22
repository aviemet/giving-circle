import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewPresentationSlide from "@/pages/Presentations/Slides/New"
import { createSlideData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Slides/New/index", () => {
	test("renders new presentation slide form", () => {
		const presentation_slide: Schema.SlidesFormData = {
			data: createSlideData(),
		}

		render(<NewPresentationSlide presentation_slide={ presentation_slide } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Slide" })
	})
})
