import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PresentationElementsIndex from "@/pages/Presentations/Elements/Index"
import { createPagination } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Elements/Index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders elements index", () => {
		const element: Schema.PresentationElementsIndex = {
			id: "element-1",
			data: {},
			name: "Element 1",
			slug: "element-1",
			template: false,
		}

		render(
			<PresentationElementsIndex
				presentation_elements={ [element] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByLabelText("Search")
	})
})
