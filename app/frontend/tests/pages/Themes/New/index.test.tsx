import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewTheme from "@/pages/Themes/New"
import { createCircleInertiaShare, createThemesFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Themes/New/index", () => {
	registerActiveCircleLifecycle()

	test("renders new theme form", () => {
		render(
			<NewTheme
				circle={ createCircleInertiaShare() }
				theme={ createThemesFormData() }
			/>,
		)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Theme" })
	})
})
