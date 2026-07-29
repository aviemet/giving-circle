import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewPresentationElement from "@/pages/Presentations/Elements/New"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Elements/New", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders new element form", () => {
		const presentation_element: Schema.PresentationElementsFormData = {
			data: {},
			name: "",
			template: false,
		}

		render(<NewPresentationElement presentation_element={ presentation_element } />)

		screen.getByLabelText(/Name/i)
	})
})
