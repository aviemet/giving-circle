import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import TemplatesIndex from "@/pages/Templates/Index"
import {
	createCirclesOptions,
	createPagination,
	createTemplatesIndex,
	createThemesIndex,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Templates/Index", () => {
	registerActiveCircleLifecycle()

	test("renders templates index helper copy", () => {
		render(
			<TemplatesIndex
				templates={ [createTemplatesIndex()] }
				themes={ [createThemesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				circle={ createCirclesOptions() }
			/>,
		)

		screen.getByText(/Reusable slide layouts/i)
		screen.getByLabelText("Search")
		screen.getByRole("button", { name: "Actions" })
	})
})
