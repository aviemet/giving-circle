import { describe, test } from "vitest"

import ShowPresentationInteractionResponse from "@/pages/Presentations/InteractionResponses/Show"
import {
	createMembershipPersisted,
	createPresentationInteractionsShow,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/InteractionResponses/Show", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders response show", () => {
		const presentation_interaction_response: Schema.PresentationInteractionResponsesShow = {
			id: "response-1",
			membership: createMembershipPersisted(),
			membership_id: "membership-1",
			presentation_interaction_id: "interaction-1",
			response_data: {},
		}

		render(
			<ShowPresentationInteractionResponse
				presentation_interaction={ createPresentationInteractionsShow() }
				presentation_interaction_response={ presentation_interaction_response }
			/>,
		)
	})
})
