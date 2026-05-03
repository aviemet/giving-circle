import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ActivePresentationOverview from "@/pages/Presentations/Active/Overview"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Overview/index", () => {
	test("renders overview", () => {
		render(<ActivePresentationOverview />)

		screen.getByText("Overview")
	})
})
