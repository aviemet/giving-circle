import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PreviewSlide from "@/pages/Preview/Slide"
import { render } from "@/tests/helpers/utils"

describe("pages/Preview/Slide/index", () => {
	test("renders empty preview state", () => {
		render(<PreviewSlide />)

		screen.getByText(/No preview data/)
	})
})
