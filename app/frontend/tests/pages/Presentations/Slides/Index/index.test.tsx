import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PresentationSlidesIndex from "@/pages/Presentations/Slides/Index"
import { createPagination, createSlidesIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Slides/Index/index", () => {
	test("renders presentation slides index", () => {
		render(
			<PresentationSlidesIndex
				presentation_slides={ [createSlidesIndex()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByLabelText("Search")
		screen.getByRole("button", { name: "Actions" })
		screen.getByRole("table")
		screen.getByRole("checkbox", { name: "Select record 1" })
	})
})
