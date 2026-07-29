import { describe, expect, test } from "vitest"

import { STATUS_CODES, isAllowedStatusCode } from "@/lib/statusCodes"

describe("lib/statusCodes", () => {
	test("maps common status codes", () => {
		expect(STATUS_CODES[200]).toBe("OK")
		expect(STATUS_CODES[404]).toBe("Not Found")
	})

	test("isAllowedStatusCode matches by status text", () => {
		expect(isAllowedStatusCode("OK", 200)).toBe(true)
		expect(isAllowedStatusCode("Created", [200, 201])).toBe(true)
		expect(isAllowedStatusCode("Not Found", [200, 201])).toBe(false)
		expect(isAllowedStatusCode("Totally Fake", 200)).toBe(false)
	})
})
