import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { describe, expect, test } from "vitest"

import { ensureDate, isDate, nearestHalfHour, parseTimeString } from "@/lib/dates"

dayjs.extend(customParseFormat)

describe("lib/dates", () => {
	test("ensureDate accepts Date string and number", () => {
		const date = new Date(2024, 0, 15)
		expect(ensureDate(date).getFullYear()).toBe(2024)
		expect(ensureDate("2024-01-15").getFullYear()).toBe(2024)
		expect(ensureDate(date.getTime()).getFullYear()).toBe(2024)
		expect(ensureDate({})).toBeInstanceOf(Date)
	})

	test("isDate narrows Date instances", () => {
		expect(isDate(new Date())).toBe(true)
		expect(isDate("2024-01-01")).toBe(false)
	})

	test("nearestHalfHour rounds minutes", () => {
		const result = nearestHalfHour(new Date(2024, 0, 15, 14, 20))
		expect(result.getMinutes() === 0 || result.getMinutes() === 30).toBe(true)
	})

	test("parseTimeString parses common formats", () => {
		expect(parseTimeString("2:30 PM")).toEqual({ hour: 14, minute: 30 })
		expect(parseTimeString("14:05")).toEqual({ hour: 14, minute: 5 })
		expect(parseTimeString("")).toBeNull()
		expect(parseTimeString("not-a-time")).toBeNull()
	})
})
