import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import ShowPresentationInteraction from "@/pages/Presentations/Interactions/Show"
import { createPresentationInteractionsShow } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Interactions/Show", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders interaction status and answer count", () => {
		render(
			<ShowPresentationInteraction
				presentation_interaction={ createPresentationInteractionsShow({
					name: "Allocation Round",
					accepting_responses: true,
				}) }
			/>,
		)

		expect(screen.getByText("Accepting responses")).toBeTruthy()
		expect(screen.getByText(/0 member answers configured/i)).toBeTruthy()
	})
})
