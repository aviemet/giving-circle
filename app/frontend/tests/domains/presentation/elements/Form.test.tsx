import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { PresentationElementForm } from "@/domains/presentation/elements/Form"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/elements/Form", () => {
	test("renders create element form", () => {
		render(
			<PresentationElementForm
				to="/elements"
				presentation_element={ {
					data: {},
					name: "",
					template: false,
				} }
			/>,
		)
		screen.getByRole("button", { name: /Create/i })
	})

	test("renders update element form", () => {
		render(
			<PresentationElementForm
				to="/elements/1"
				method="put"
				presentation_element={ {
					id: "element-1",
					data: { key: "value" },
					name: "Element 1",
					template: false,
				} }
			/>,
		)
		screen.getByRole("button", { name: /Update/i })
	})
})
