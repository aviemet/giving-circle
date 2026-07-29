import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PresentationInteractionsIndex from "@/pages/Presentations/Interactions/Index"
import {
	createPagination,
	createPresentationInteractionsIndex,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Interactions/Index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders interactions index", () => {
		render(
			<PresentationInteractionsIndex
				presentation_interactions={ [createPresentationInteractionsIndex()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByLabelText("Search")
		screen.getByRole("button", { name: "Actions" })
	})
})
