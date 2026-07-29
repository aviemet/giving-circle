import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewMailSettings from "@/pages/Settings/Mail/New"
import { createSmtpsFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Mail/New", () => {
	registerActiveCircleLifecycle()

	test("renders new smtp form", () => {
		render(<NewMailSettings smtp={ createSmtpsFormData() } />)

		screen.getByLabelText(/Host|Name/)
	})
})
