import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditTheme from "@/pages/Themes/Edit"
import { createThemesEdit } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Themes/Edit/index", () => {
	registerActiveCircleLifecycle()

	test("renders edit theme form", () => {
		render(<EditTheme theme={ createThemesEdit() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Theme" })
	})
})
