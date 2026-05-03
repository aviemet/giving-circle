import { screen, waitFor } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditPresentationSlides from "@/pages/Presentations/Slides/Edit"
import { createSlideData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Slides/Edit/index", () => {
	test("renders slide visual editor", async() => {
		const presentation: Schema.PresentationsFormData = {
			active: true,
			name: "Presentation",
			slides: [],
			theme_id: "theme-1",
		}

		const slide: Schema.SlidesFormData = {
			id: "slide-1",
			slug: "slide-1",
			data: createSlideData(),
			title: "My Slide",
		}

		render(<EditPresentationSlides presentation={ presentation } slide={ slide } />)

		await waitFor(() => {
			screen.getByRole("button", { name: "Save" })
		}, { timeout: 30000 })
	}, 35000)
})
