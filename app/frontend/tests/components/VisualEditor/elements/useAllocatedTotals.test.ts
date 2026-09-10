import { renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import {
	stableMockNeedCents,
	useAllocatedTotals,
} from "@/components/VisualEditor/elements/BarGraphAllocatedTotals/useAllocatedTotals"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"

const { usePresentationDataContextMock } = vi.hoisted(() => ({
	usePresentationDataContextMock: vi.fn(),
}))

vi.mock("@/features/presentation/PresentationDataProvider", () => ({
	usePresentationDataContext: usePresentationDataContextMock,
}))

describe("components/VisualEditor/elements/BarGraphAllocatedTotals/useAllocatedTotals", () => {
	test("stableMockNeedCents is deterministic per org id", () => {
		expect(stableMockNeedCents("org-1")).toBe(stableMockNeedCents("org-1"))
		expect(stableMockNeedCents("org-1")).toBeGreaterThanOrEqual(50_000)
		expect(stableMockNeedCents("org-1")).toBeLessThanOrEqual(250_000)
		expect(stableMockNeedCents("org-1")).not.toBe(stableMockNeedCents("org-2"))
	})

	test("returns mock totals for finalist orgs in the editor", () => {
		const orgOne = createPresentationOrgPersisted({ id: "org-1", name: "Alpha Org" })
		const orgTwo = createPresentationOrgPersisted({ id: "org-2", name: "Beta Org" })
		const orgThree = createPresentationOrgPersisted({ id: "org-3", name: "Gamma Org" })

		usePresentationDataContextMock.mockReturnValue({
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({ orgs: [orgOne, orgTwo, orgThree] }),
			isEditor: true,
			values: {
				finalist_org_ids: ["org-1", "org-2"],
				allocated_totals: [],
				org_vote_totals: [],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: false,
		})

		const { result } = renderHook(() => useAllocatedTotals())

		expect(result.current.map((entry) => entry.orgId)).toEqual(["org-1", "org-2"])
	})

	test("returns live totals only for finalist orgs when vote has narrowed the field", () => {
		const orgOne = createPresentationOrgPersisted({ id: "org-1", name: "Alpha Org" })
		const orgTwo = createPresentationOrgPersisted({ id: "org-2", name: "Beta Org" })

		usePresentationDataContextMock.mockReturnValue({
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({
				id: "presentation-1",
				orgs: [orgOne, orgTwo],
			}),
			isEditor: false,
			values: {
				finalist_org_ids: ["org-1"],
				allocated_totals: [
					{ org_id: "org-1", allocated_cents: 50_000, currency: "USD" },
					{ org_id: "org-2", allocated_cents: 25_000, currency: "USD" },
				],
				org_vote_totals: [],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: true,
		})

		const { result } = renderHook(() => useAllocatedTotals())

		expect(result.current).toHaveLength(1)
		expect(result.current[0]?.orgId).toBe("org-1")
		expect(result.current[0]?.orgName).toBe("Alpha Org")
	})

	test("returns live totals for all orgs when no finalist vote has narrowed the field", () => {
		const orgOne = createPresentationOrgPersisted({ id: "org-1", name: "Alpha Org" })
		const orgTwo = createPresentationOrgPersisted({ id: "org-2", name: "Beta Org" })

		usePresentationDataContextMock.mockReturnValue({
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({
				id: "presentation-1",
				orgs: [orgOne, orgTwo],
			}),
			isEditor: false,
			values: {
				finalist_org_ids: [],
				allocated_totals: [],
				org_vote_totals: [],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: true,
		})

		const { result } = renderHook(() => useAllocatedTotals())

		expect(result.current.map((entry) => entry.orgId)).toEqual(["org-1", "org-2"])
	})
})
