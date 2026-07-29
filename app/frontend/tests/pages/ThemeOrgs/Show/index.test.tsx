import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowThemeOrg from "@/pages/ThemeOrgs/Show"
import { createThemesOrgsShow } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/ThemeOrgs/Show/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders theme org show", () => {
		render(<ShowThemeOrg org={ createThemesOrgsShow() } />)

		screen.getByText("Org description")
	})
})
