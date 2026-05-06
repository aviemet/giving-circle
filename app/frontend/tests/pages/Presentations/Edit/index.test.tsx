import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditPresentation from "@/pages/Presentations/Edit"
import { createPresentationsEdit } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Edit/index", () => {
	test("renders edit presentation form", () => {
		render(<EditPresentation presentation={ createPresentationsEdit() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Presentation" })
	})
})
