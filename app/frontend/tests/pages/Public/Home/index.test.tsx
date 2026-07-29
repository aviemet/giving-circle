import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import Home from "@/pages/Public/Home"
import { render } from "@/tests/helpers/utils"

describe("pages/Public/Home/index", () => {
	test("renders public home placeholder", () => {
		render(<Home />)

		screen.getByText("Giving Circle")
		screen.getByText(/placeholder page for the public section/)
	})
})
