import { describe, expect, test } from "vitest"

import {
	fundedPercent,
	isFullyFunded,
	remainingNeed,
} from "@/features/presentation"
import { fromCents } from "@/lib/money"

describe("features/presentation/values/allocatedTotals", () => {
	test("isFullyFunded requires positive need and allocated at or above need", () => {
		expect(isFullyFunded({ allocated: 100_000, need: 100_000 })).toBe(true)
		expect(isFullyFunded({ allocated: 150_000, need: 100_000 })).toBe(true)
		expect(isFullyFunded({ allocated: 99_999, need: 100_000 })).toBe(false)
		expect(isFullyFunded({ allocated: 50_000, need: 0 })).toBe(false)
		expect(isFullyFunded({ allocated: 0, need: -1 })).toBe(false)
		expect(isFullyFunded({
			allocated: fromCents(100_000, "USD"),
			need: fromCents(100_000, "USD"),
		})).toBe(true)
	})

	test("fundedPercent clamps to 0..100", () => {
		expect(fundedPercent({ allocated: 50_000, need: 100_000 })).toBe(50)
		expect(fundedPercent({ allocated: 200_000, need: 100_000 })).toBe(100)
		expect(fundedPercent({ allocated: 50_000, need: 0 })).toBe(0)
		expect(fundedPercent({ allocated: 50_000, need: -10 })).toBe(0)
		expect(fundedPercent({
			allocated: fromCents(50_000, "USD"),
			need: fromCents(100_000, "USD"),
		})).toBe(50)
	})

	test("remainingNeed is need minus allocated floored at zero", () => {
		expect(remainingNeed({ allocated: 25_000, need: 100_000 })).toEqual(fromCents(75_000, "USD"))
		expect(remainingNeed({ allocated: 100_000, need: 100_000 })).toEqual(fromCents(0, "USD"))
		expect(remainingNeed({ allocated: 150_000, need: 100_000 })).toEqual(fromCents(0, "USD"))
		expect(remainingNeed({
			allocated: fromCents(25_000, "EUR"),
			need: fromCents(100_000, "EUR"),
		})).toEqual(fromCents(75_000, "EUR"))
	})
})
