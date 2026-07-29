import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditPresentationElement from "@/pages/Presentations/Elements/Edit"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Elements/Edit", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders edit element form", () => {
		const presentation_element: Schema.PresentationElementsEdit = {
			id: "element-1",
			data: {},
			name: "Element 1",
			slug: "element-1",
			template: false,
		}

		render(<EditPresentationElement presentation_element={ presentation_element } />)

		screen.getByLabelText(/Name/i)
	})
})
