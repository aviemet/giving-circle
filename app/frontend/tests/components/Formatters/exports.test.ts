import { describe, expect, test } from "vitest"

import {
	AddressFormatter,
	CurrencyFormatter,
	DateTimeFormatter,
	EmailFormatter,
	PhoneFormatter,
	NumberFormatter,
} from "@/components"

describe("components Formatters barrel", () => {
	test("exposes formatters only via Formatters namespace from @/components", () => {
		expect(AddressFormatter).toBeDefined()
		expect(CurrencyFormatter).toBeDefined()
		expect(DateTimeFormatter).toBeDefined()
		expect(EmailFormatter).toBeDefined()
		expect(PhoneFormatter).toBeDefined()
		expect(NumberFormatter).toBeDefined()
	})
})
