import { describe, test } from "vitest"

import EditPresentationInteractionResponse from "@/pages/Presentations/InteractionResponses/Edit"
import {
	createMembershipPersisted,
	createPresentationInteractionsShow,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/InteractionResponses/Edit", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders edit response form", () => {
		const presentation_interaction_response: Schema.PresentationInteractionResponsesEdit = {
			id: "response-1",
			context: {},
			membership_id: "membership-1",
			memberships: [createMembershipPersisted()],
			presentation_interaction_id: "interaction-1",
			response_data: {},
		}

		render(
			<EditPresentationInteractionResponse
				presentation_interaction={ createPresentationInteractionsShow() }
				presentation_interaction_response={ presentation_interaction_response }
			/>,
		)
	})
})
