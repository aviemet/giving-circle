import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditMailSettings from "@/pages/Settings/Mail/Edit"
import { createSmtpsFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Mail/Edit", () => {
	registerActiveCircleLifecycle()

	test("renders edit smtp form", () => {
		render(
			<EditMailSettings
				smtp={ createSmtpsFormData({ id: "smtp-1" }) }
			/>,
		)

		screen.getByLabelText(/Host|Name/)
	})
})
