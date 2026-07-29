import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { PresentationSlideForm } from "@/domains/presentation/slides/Form"
import { createSlideData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/slides/Form", () => {
	test("renders create slide form", () => {
		render(
			<PresentationSlideForm
				to="/slides"
				slide={ {
					id: "",
					slug: "slide-1",
					data: createSlideData(),
					title: "Slide 1",
				} }
			/>,
		)
		screen.getByRole("button", { name: /Create/i })
	})

	test("renders update slide form", () => {
		render(
			<PresentationSlideForm
				to="/slides/1"
				method="put"
				slide={ {
					id: "slide-1",
					slug: "slide-1",
					data: createSlideData(),
					title: "Slide 1",
				} }
			/>,
		)
		screen.getByRole("button", { name: /Update/i })
	})
})
