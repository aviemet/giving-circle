import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { MemberInteractForm } from "@/features/presentation"
import { AllocationVoteForm } from "@/features/presentation/interactions/allocation/AllocationVoteForm"
import { FinalistVoteForm } from "@/features/presentation/interactions/finalistVote/FinalistVoteForm"
import { memberInteractionUiBySlug } from "@/features/presentation/interactions/memberInteractionUi"
import { PledgesForm } from "@/features/presentation/interactions/pledges/PledgesForm"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("features/presentation/interactions/memberInteractionUi", () => {
	test("slug map wires curated member screens", () => {
		expect(memberInteractionUiBySlug.allocation).toBe(AllocationVoteForm)
		expect(memberInteractionUiBySlug.finalist_vote).toBe(FinalistVoteForm)
		expect(memberInteractionUiBySlug.pledges).toBe(PledgesForm)
		expect(memberInteractionUiBySlug.unknown).toBeUndefined()
	})

	test("MemberInteractForm routes pledges slug to pledges UI", () => {
		const circle = createCirclePersisted()
		const presentation = createPresentationPresentation()
		const orgs = [
			createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" }),
			createPresentationOrgPersisted({ id: "org-2", name: "Org Two", slug: "org-two" }),
		]

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ null }
				availableVotes={ null }
				activeInteraction={ {
					id: "interaction-pledges",
					name: "Pledges",
					slug: "pledges",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-pledges",
						slug: "pledges",
						name: "Pledges",
					},
					config: {
						fields: [],
						outputs: [],
					},
					context: {
						presentation_orgs: orgs,
						finalist_org_ids: ["org-1", "org-2"],
						settings: {},
					},
				} }
			/>,
		)

		expect(screen.getByRole("button", { name: /org one/i })).toBeTruthy()
		expect(screen.getByLabelText(/select multiple organizations/i)).toBeTruthy()
	})
})
