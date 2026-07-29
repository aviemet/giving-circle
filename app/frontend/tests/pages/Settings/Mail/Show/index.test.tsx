import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowMailSetting from "@/pages/Settings/Mail/Show"
import { createSmtpsShow } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Mail/Show", () => {
	registerActiveCircleLifecycle()

	test("renders smtp details", () => {
		render(<ShowMailSetting smtp={ createSmtpsShow() } />)

		screen.getByText("smtp.example.com")
		screen.getByText("587")
	})
})
