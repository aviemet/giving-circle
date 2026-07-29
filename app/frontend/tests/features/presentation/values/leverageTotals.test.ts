import { renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import {
	buildMockLeverage,
	deriveLeverageFromAsksAndAllocated,
	leverageFilledPercent,
	useLeverageTotals,
} from "@/features/presentation/values/leverageTotals"
import { fromCents } from "@/lib/money"
import {
	createCircleMock,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"

const { usePresentationDataContextMock } = vi.hoisted(() => ({
	usePresentationDataContextMock: vi.fn(),
}))

vi.mock("@/features/presentation/PresentationDataProvider", () => ({
	usePresentationDataContext: usePresentationDataContextMock,
}))

describe("features/presentation/values/leverageTotals", () => {
	test("buildMockLeverage uses fixed remaining and total cents", () => {
		expect(buildMockLeverage("USD")).toEqual({
			remaining: fromCents(6_000_000, "USD"),
			total: fromCents(40_000_000, "USD"),
		})
	})

	test("deriveLeverageFromAsksAndAllocated subtracts allocated from asks", () => {
		expect(deriveLeverageFromAsksAndAllocated(
			[100_000, 50_000],
			"USD",
			{ allocated_totals: [{ allocated_cents: 40_000 }] },
		)).toEqual({
			remaining: fromCents(110_000, "USD"),
			total: fromCents(150_000, "USD"),
		})
	})

	test("deriveLeverageFromAsksAndAllocated falls back to mock total when asks are empty", () => {
		expect(deriveLeverageFromAsksAndAllocated([], "EUR", undefined)).toEqual({
			remaining: fromCents(0, "EUR"),
			total: fromCents(40_000_000, "EUR"),
		})
	})

	test("leverageFilledPercent clamps ratio of remaining to total", () => {
		expect(leverageFilledPercent({
			remaining: fromCents(25_000, "USD"),
			total: fromCents(100_000, "USD"),
		})).toBe(25)
		expect(leverageFilledPercent({
			remaining: fromCents(200_000, "USD"),
			total: fromCents(100_000, "USD"),
		})).toBe(100)
		expect(leverageFilledPercent({
			remaining: fromCents(10_000, "USD"),
			total: fromCents(0, "USD"),
		})).toBe(0)
	})

	test("useLeverageTotals returns mock leverage in the editor", () => {
		usePresentationDataContextMock.mockReturnValue({
			circle: createCircleMock(),
			presentation: createPresentationPresentation({
				orgs: [createPresentationOrgPersisted({
					ask: { amount: 1000, cents: 100_000, currency_iso: "USD" },
				})],
			}),
			isEditor: true,
			values: undefined,
			isSubscribed: false,
		})

		const { result } = renderHook(() => useLeverageTotals())

		expect(result.current).toEqual(buildMockLeverage("USD"))
	})

	test("useLeverageTotals derives live totals outside the editor", () => {
		usePresentationDataContextMock.mockReturnValue({
			circle: createCircleMock({ orgs: [] }),
			presentation: createPresentationPresentation({
				orgs: [
					createPresentationOrgPersisted({
						id: "org-1",
						ask: { amount: 1000, cents: 100_000, currency_iso: "USD" },
					}),
					createPresentationOrgPersisted({
						id: "org-2",
						ask: { amount: 500, cents: 50_000, currency_iso: "USD" },
					}),
				],
			}),
			isEditor: false,
			values: {
				allocated_totals: [{ org_id: "org-1", allocated_cents: 40_000, currency: "USD" }],
				org_vote_totals: [],
				finalist_org_ids: [],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			isSubscribed: true,
		})

		const { result } = renderHook(() => useLeverageTotals())

		expect(result.current).toEqual({
			remaining: fromCents(110_000, "USD"),
			total: fromCents(150_000, "USD"),
		})
	})

	test("useLeverageTotals falls back to circle orgs when presentation has none", () => {
		usePresentationDataContextMock.mockReturnValue({
			circle: createCircleMock({
				orgs: [{
					id: "org-circle",
					name: "Circle Org",
					slug: "circle-org",
				}],
			}),
			presentation: createPresentationPresentation({ orgs: [] }),
			isEditor: false,
			values: {
				allocated_totals: [],
				org_vote_totals: [],
				finalist_org_ids: [],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			isSubscribed: true,
		})

		const { result } = renderHook(() => useLeverageTotals())

		expect(result.current.total).toEqual(fromCents(40_000_000, "USD"))
		expect(result.current.remaining).toEqual(fromCents(0, "USD"))
	})
})
