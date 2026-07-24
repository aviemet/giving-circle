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
} from "@/features/presentation/interact/allocation/allocationBudget"

describe("allocationBudget", () => {
	test("sums and remaining cents", () => {
		const amounts = { "org-1": 1_000, "org-2": 2_500 }

		expect(sumAllocatedCents(amounts)).toBe(3_500)
		expect(remainingCents(5_000, amounts)).toBe(1_500)
	})

	test("org slider track max is always total available funds", () => {
		expect(orgSliderMaxCents(5_000)).toBe(5_000)
		expect(orgSliderMaxCents(0)).toBe(0)
	})

	test("assignable max keeps total within available funds", () => {
		const amounts = { "org-1": 2_000, "org-2": 1_000 }

		expect(maxAssignableCents(5_000, amounts, "org-1")).toBe(4_000)
		expect(maxAssignableCents(5_000, amounts, "org-2")).toBe(3_000)
	})

	test("canFinalizeVote requires full allocation unless partial allowed", () => {
		const amounts = { "org-1": 2_000, "org-2": 3_000 }

		expect(canFinalizeVote(5_000, amounts, false)).toBe(true)
		expect(canFinalizeVote(5_000, { "org-1": 1_000 }, false)).toBe(false)
		expect(canFinalizeVote(5_000, { "org-1": 1_000 }, true)).toBe(true)
		expect(canFinalizeVote(5_000, { "org-1": 6_000 }, true)).toBe(false)
	})

	test("clampOrgAmountCents enforces total available funds", () => {
		const amounts = { "org-1": 1_000, "org-2": 3_000 }

		expect(clampOrgAmountCents(5_000, amounts, "org-1", 4_000)).toBe(2_000)
		expect(clampOrgAmountCents(5_000, amounts, "org-1", 1_500)).toBe(1_500)
		expect(clampOrgAmountCents(5_000, amounts, "org-1", -10)).toBe(0)
	})

	test("round-trips entries and amounts", () => {
		const amounts = allocationAmountsFromEntries(
			["org-1", "org-2"],
			[{ org_id: "org-1", amount_cents: 250 }],
		)

		expect(amounts).toEqual({ "org-1": 250, "org-2": 0 })
		expect(allocationEntriesFromAmounts(amounts)).toEqual([
			{ org_id: "org-1", amount_cents: 250 },
			{ org_id: "org-2", amount_cents: 0 },
		])
	})
})
