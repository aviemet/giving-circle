import { describe, expect, test } from "vitest"

import {
	allocationAmountsFromEntries,
	allocationEntriesFromAmounts,
	canFinalizeVote,
	clampOrgAmountCents,
	maxAssignableCents,
	orgSliderMaxCents,
	remainingCents,
	sumAllocatedCents,
} from "@/features/presentation/interactions/allocation/allocationBudget"

describe("features/presentation/interactions/allocation/allocationBudget", () => {
	test("builds amounts from entries", () => {
		expect(allocationAmountsFromEntries(["a", "b"], undefined)).toEqual({ a: 0, b: 0 })
		expect(allocationAmountsFromEntries(["a", "b"], [
			{ org_id: "a", amount_cents: 500 },
			{ org_id: "c", amount_cents: 100 },
		])).toEqual({ a: 500, b: 0 })
	})

	test("converts amounts to entries and sums", () => {
		const amounts = { a: 100, b: 200 }
		expect(allocationEntriesFromAmounts(amounts)).toEqual([
			{ org_id: "a", amount_cents: 100 },
			{ org_id: "b", amount_cents: 200 },
		])
		expect(sumAllocatedCents(amounts)).toBe(300)
		expect(remainingCents(1000, amounts)).toBe(700)
	})

	test("clamps and finalizes allocation", () => {
		const amounts = { a: 100, b: 200 }
		expect(orgSliderMaxCents(500)).toBe(500)
		expect(maxAssignableCents(500, amounts, "a")).toBe(300)
		expect(clampOrgAmountCents(500, amounts, "a", 400)).toBe(300)
		expect(clampOrgAmountCents(500, amounts, "a", -10)).toBe(0)
		expect(canFinalizeVote(300, amounts, false)).toBe(true)
		expect(canFinalizeVote(400, amounts, false)).toBe(false)
		expect(canFinalizeVote(400, amounts, true)).toBe(true)
	})
})
