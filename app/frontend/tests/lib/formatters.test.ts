import { afterEach, describe, expect, test } from "vitest"

import { currency, datetime, number } from "@/lib/formatters"
import { setCurrentAppLocale } from "@/lib/locale"

describe("lib/formatters currency", () => {
	afterEach(() => {
		setCurrentAppLocale("en")
	})

	test("formats a default currency amount", () => {
		expect(currency.format(500, "USD", "en-US")).toBe("$500.00")
	})

	test("formats whole dollars without fraction digits", () => {
		expect(currency.whole(500, "USD", "en-US")).toBe("$500")
		expect(currency.whole(108_770.4, "USD", "en-US")).toBe("$108,770")
	})

	test("formats compact currency amounts", () => {
		expect(currency.compact(304_000, "USD", "en-US")).toBe("$304K")
	})

	test("formats currency for an explicit locale", () => {
		expect(currency.format(500, "EUR", "de-DE")).toBe("500,00\u00A0€")
	})

	test("uses the site locale when no locale argument is provided", () => {
		setCurrentAppLocale("de-DE")
		expect(currency.format(500, "EUR")).toBe("500,00\u00A0€")
	})

	test("formats Money objects using amount and currency_iso", () => {
		expect(currency.format({ amount: 500, cents: 50_000, currency_iso: "USD" }, undefined, "en-US")).toBe("$500.00")
		expect(currency.whole({ amount: 500, cents: 50_000, currency_iso: "EUR" }, undefined, "de-DE")).toBe("500\u00A0€")
	})
})

describe("lib/formatters number", () => {
	test("formats decimals for an explicit locale", () => {
		expect(number.decimal(12.345, 1, "en-US")).toBe("12.3")
		expect(number.decimal(12.345, 1, "de-DE")).toBe("12,3")
	})
})

describe("lib/formatters datetime", () => {
	const sampleDate = new Date(2024, 0, 15, 14, 30, 45)

	test("formats dates with dayjs patterns", () => {
		expect(datetime.dateEnglish(sampleDate)).toBe("01/15/2024")
		expect(datetime.dateShort(sampleDate)).toBe("1/15/24")
		expect(datetime.dateUrl(sampleDate)).toBe("2024-01-15")
	})

	test("formats a date range", () => {
		const start = new Date(2024, 0, 15)
		const end = new Date(2024, 1, 20)
		expect(datetime.range(start, end)).toBe("January 15 - February 20")
	})

	test("formats relative time with dayjs", () => {
		const past = new Date(Date.now() - 60 * 60 * 1000)
		expect(datetime.fromNow(past)).toBe("an hour ago")
		expect(datetime.duration(past)).toBe("an hour")
	})
})
