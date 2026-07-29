import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import EditPresentationInteraction from "@/pages/Presentations/Interactions/Edit"
import { createPresentationInteractionsEdit } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Interactions/Edit", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders edit interaction form", () => {
		render(
			<EditPresentationInteraction
				presentation_interaction={ createPresentationInteractionsEdit({
					name: "Allocation Round",
				}) }
			/>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Update Interaction" })).toBeTruthy()
	})
})
