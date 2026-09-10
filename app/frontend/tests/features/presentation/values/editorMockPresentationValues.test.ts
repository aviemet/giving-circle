import { describe, expect, test } from "vitest"

import {
	buildEditorMockPresentationValues,
	DEFAULT_FINALIST_COUNT,
	editorFinalistCountFromPresentation,
	editorFinalistOrgIds,
} from "@/features/presentation/values/editorMockPresentationValues"

describe("features/presentation/values/editorMockPresentationValues", () => {
	test("editorFinalistOrgIds caps mock finalists using the presentation count", () => {
		const orgs = Array.from({ length: 8 }, (_, index) => ({ id: `org-${index + 1}` }))

		expect(editorFinalistOrgIds(orgs, 5)).toEqual([
			"org-1",
			"org-2",
			"org-3",
			"org-4",
			"org-5",
		])
		expect(DEFAULT_FINALIST_COUNT).toBe(5)
	})

	test("editorFinalistCountFromPresentation reads presentation settings and mock circle fallback", () => {
		expect(editorFinalistCountFromPresentation({ settings: { finalist_count: 3 } })).toBe(3)

		expect(editorFinalistCountFromPresentation(undefined, {
			id: "circle-1",
			name: "Circle",
			slug: "circle-1",
			finalist_count: 4,
			themes: [],
			orgs: [],
			memberships: [],
		})).toBe(4)
	})

	test("buildEditorMockPresentationValues returns undefined when there are no orgs", () => {
		expect(buildEditorMockPresentationValues([])).toBeUndefined()
	})

	test("buildEditorMockPresentationValues includes finalist ids and empty live metrics", () => {
		expect(buildEditorMockPresentationValues([
			{ id: "org-1" },
			{ id: "org-2" },
		], 2)).toEqual({
			finalist_org_ids: ["org-1", "org-2"],
			allocated_totals: [],
			pledge_totals: [],
			funding_totals: [],
			funded_org_ids: [],
			leverage: null,
			org_vote_totals: [],
			money_totals: [],
			vote_counts: [],
			rank_totals: [],
		})
	})
})
