import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import AboutCircle from "@/pages/Public/Circles/About"
import { createCircleShow } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Public/Circles/About/index", () => {
	test("renders about circle", () => {
		render(<AboutCircle circle={ createCircleShow() } />)

		screen.getByText("About Circle 1")
	})
})
