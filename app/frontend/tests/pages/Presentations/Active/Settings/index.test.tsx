import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ActivePresentationSettings from "@/pages/Presentations/Active/Settings"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Settings/index", () => {
	test("renders settings", () => {
		render(<ActivePresentationSettings />)

		screen.getByText("Settings")
	})
})
