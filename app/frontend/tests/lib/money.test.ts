import { describe, expect, test } from "vitest"

import { amountOf, centsOf, currencyIsoOf, fromCents, isMoney } from "@/lib/money"

describe("lib/money", () => {
	test("fromCents builds a Money object", () => {
		expect(fromCents(10_000, "EUR")).toEqual({
			cents: 10_000,
			amount: 100,
			currency_iso: "EUR",
		})
	})

	test("centsOf accepts cents numbers or Money", () => {
		expect(centsOf(10_000)).toBe(10_000)
		expect(centsOf(fromCents(10_000, "USD"))).toBe(10_000)
	})

	test("amountOf converts cents numbers and reads Money.amount", () => {
		expect(amountOf(10_000)).toBe(100)
		expect(amountOf(fromCents(10_000, "USD"))).toBe(100)
	})

	test("currencyIsoOf falls back for bare numbers", () => {
		expect(currencyIsoOf(10_000)).toBe("USD")
		expect(currencyIsoOf(10_000, "EUR")).toBe("EUR")
		expect(currencyIsoOf(fromCents(10_000, "GBP"))).toBe("GBP")
	})

	test("isMoney narrows Money objects", () => {
		expect(isMoney(fromCents(100, "USD"))).toBe(true)
		expect(isMoney(100)).toBe(false)
		expect(isMoney(null)).toBe(false)
	})
})
