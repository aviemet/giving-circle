import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PresentationInteractionResponsesIndex from "@/pages/Presentations/InteractionResponses/Index"
import {
	createMembershipPersisted,
	createPagination,
	createPresentationInteractionsShow,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/InteractionResponses/Index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders responses index", () => {
		const response: Schema.PresentationInteractionResponsesIndex = {
			id: "response-1",
			membership: createMembershipPersisted(),
			membership_id: "membership-1",
			presentation_interaction_id: "interaction-1",
			response_data: {},
		}

		render(
			<PresentationInteractionResponsesIndex
				presentation_interaction={ createPresentationInteractionsShow() }
				presentation_interaction_responses={ [response] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByLabelText("Search")
	})
})
