import { describe, expect, test } from "vitest"

import {
	buildMemberInteractionEditorPreviewInteraction,
	memberEditorAvailableVotes,
} from "@/features/presentation/interactions/memberUi"
import {
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"

describe("memberInteractionEditorPreview", () => {
	test("builds preview interaction context from presentation orgs and root props", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One" })
		const interaction = {
			id: "interaction-1",
			name: "Finalist vote",
			slug: "finalist-vote",
			config: { fields: [], outputs: [] },
			interaction_ui_template: {
				id: "ui-1",
				slug: "finalist_vote",
				name: "Finalist vote",
			},
		}

		const previewInteraction = buildMemberInteractionEditorPreviewInteraction(
			interaction,
			{
				circle: { id: "circle-1", slug: "circle-1", name: "Circle" },
				presentation: createPresentationPresentation({ orgs: [org] }),
				values: {
					finalist_org_ids: ["org-1"],
					allocated_totals: [],
					pledge_totals: [],
					funding_totals: [],
					funded_org_ids: [],
					leverage: null,
					org_vote_totals: [],
					money_totals: [],
					vote_counts: [],
					rank_totals: [],
				},
				elementControls: {},
				activeSlideId: undefined,
				isSubscribed: false,
				isEditor: true,
			},
			{
				defaultVotes: 12,
				allowNonFinalists: true,
			},
		)

		expect(previewInteraction.context).toEqual({
			presentation_orgs: [org],
			finalist_org_ids: ["org-1"],
			settings: {
				default_votes: 12,
				allow_non_finalists: true,
				allow_over_ask: false,
			},
		})
		expect(memberEditorAvailableVotes({ defaultVotes: 12 })).toBe(12)
	})
})
