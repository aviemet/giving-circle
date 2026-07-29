import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import ShowPresentationInteract from "@/pages/Presentations/Interact/Show"
import {
	createCirclePersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

vi.mock("@/pages/Presentations/Active/useActivePresentationChannel", () => ({
	useActivePresentationChannel: () => ({}),
}))

describe("pages/Presentations/Interact/Show", () => {
	registerActiveCircleLifecycle()

	test("renders idle waiting state when no interaction is active", () => {
		render(
			<ShowPresentationInteract
				presentation={ createPresentationPresentation() }
				circle={ createCirclePersisted() }
				active_interaction={ null }
				presentation_interaction_response={ null }
				available_funds={ null }
				available_votes={ null }
			/>,
		)

		expect(screen.getByRole("heading", { name: /waiting for the next activity/i })).toBeTruthy()
	})
})
