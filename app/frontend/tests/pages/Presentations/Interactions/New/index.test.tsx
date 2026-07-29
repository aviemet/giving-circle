import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import NewPresentationInteraction from "@/pages/Presentations/Interactions/New"
import { createPresentationInteractionsFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Interactions/New", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders new interaction form", () => {
		render(
			<NewPresentationInteraction
				presentation_interaction={ createPresentationInteractionsFormData() }
			/>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Create Interaction" })).toBeTruthy()
	})
})
