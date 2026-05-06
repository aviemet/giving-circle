import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ActivePresentationControls from "@/pages/Presentations/Active/Index"
import { createPresentationPresentation } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Index/index", () => {
	test("renders active presentation controls", () => {
		const presentation = createPresentationPresentation()

		render(<ActivePresentationControls presentation={ presentation } />)

		screen.getByText("Slide 1")
	})
})
