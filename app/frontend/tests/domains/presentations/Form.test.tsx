import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { PresentationForm } from "@/domains/presentations/Form"
import { createPresentationsFormData, createTemplatesIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/Form", () => {
	test("renders create presentation form with template select", () => {
		render(
			<PresentationForm
				to="/presentations"
				presentation={ createPresentationsFormData({ id: undefined }) }
				templates={ [createTemplatesIndex()] }
			/>,
		)
		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Presentation" })
	})

	test("renders update presentation form with finalist count", () => {
		render(
			<PresentationForm
				to="/presentations/1"
				method="put"
				presentation={ createPresentationsFormData() }
			/>,
		)
		screen.getByRole("button", { name: "Update Presentation" })
		screen.getByLabelText("Number of finalists")
	})
})
