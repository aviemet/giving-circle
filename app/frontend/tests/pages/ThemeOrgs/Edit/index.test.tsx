import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditThemeOrg from "@/pages/ThemeOrgs/Edit"
import { createOrgsEdit } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/ThemeOrgs/Edit/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders edit theme org form", () => {
		render(<EditThemeOrg org={ createOrgsEdit() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Org" })
	})
})
