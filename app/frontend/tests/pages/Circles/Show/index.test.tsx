import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowCircle from "@/pages/Circles/Show"
import { createCircleShow } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Circles/Show/index", () => {
	test("renders circle show", () => {
		const circle = createCircleShow()

		render(<ShowCircle circle={ circle } />)

		screen.getByRole("link", { name: circle.name })
	})
})
