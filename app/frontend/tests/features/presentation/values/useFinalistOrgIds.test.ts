import { renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import { useFinalistOrgIds } from "@/features/presentation/values/useFinalistOrgIds"

const { usePresentationDataContextMock } = vi.hoisted(() => ({
	usePresentationDataContextMock: vi.fn(),
}))

vi.mock("@/features/presentation/PresentationDataProvider", () => ({
	usePresentationDataContext: usePresentationDataContextMock,
}))

describe("features/presentation/values/useFinalistOrgIds", () => {
	test("reads finalist ids from presentation values", () => {
		usePresentationDataContextMock.mockReturnValue({
			values: {
				allocated_totals: [],
				org_vote_totals: [],
				finalist_org_ids: ["org-1", "org-2"],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			isSubscribed: true,
		})

		const { result } = renderHook(() => useFinalistOrgIds())

		expect(result.current).toEqual(["org-1", "org-2"])
	})

	test("returns undefined when values are missing", () => {
		usePresentationDataContextMock.mockReturnValue({
			values: undefined,
			isSubscribed: false,
		})

		const { result } = renderHook(() => useFinalistOrgIds())

		expect(result.current).toBeUndefined()
	})
})
