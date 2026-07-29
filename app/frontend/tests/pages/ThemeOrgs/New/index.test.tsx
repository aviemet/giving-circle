import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewThemeOrg from "@/pages/ThemeOrgs/New"
import { createOrgsFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/ThemeOrgs/New/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders new theme org form", () => {
		render(<NewThemeOrg org={ createOrgsFormData() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Org" })
	})
})
