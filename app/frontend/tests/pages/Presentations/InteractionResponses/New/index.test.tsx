import { describe, test } from "vitest"

import NewPresentationInteractionResponse from "@/pages/Presentations/InteractionResponses/New"
import {
	createMembershipPersisted,
	createPresentationInteractionsShow,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/InteractionResponses/New", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders new response form", () => {
		const presentation_interaction_response: Schema.PresentationInteractionResponsesFormData = {
			context: {},
			membership_id: "membership-1",
			memberships: [createMembershipPersisted()],
			presentation_interaction_id: "interaction-1",
			response_data: {},
		}

		render(
			<NewPresentationInteractionResponse
				presentation_interaction={ createPresentationInteractionsShow() }
				presentation_interaction_response={ presentation_interaction_response }
			/>,
		)
	})
})
