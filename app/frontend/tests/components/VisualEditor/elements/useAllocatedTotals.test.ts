import { describe, expect, test } from "vitest"

import { stableMockNeedCents } from "@/components/VisualEditor/elements/BarGraphAllocatedTotals/useAllocatedTotals"

describe("components/VisualEditor/elements/BarGraphAllocatedTotals/useAllocatedTotals", () => {
	test("stableMockNeedCents is deterministic per org id", () => {
		expect(stableMockNeedCents("org-1")).toBe(stableMockNeedCents("org-1"))
		expect(stableMockNeedCents("org-1")).toBeGreaterThanOrEqual(50_000)
		expect(stableMockNeedCents("org-1")).toBeLessThanOrEqual(250_000)
		expect(stableMockNeedCents("org-1")).not.toBe(stableMockNeedCents("org-2"))
	})
})
