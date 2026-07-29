import { describe, expect, test } from "vitest"

import { isUnset } from "@/lib/forms"
import { decodeId, encodeId } from "@/lib/uuid"
import { px } from "@/lib/units"

describe("lib/forms isUnset", () => {
	test("detects empty values", () => {
		expect(isUnset(Number.NaN)).toBe(true)
		expect(isUnset(new Date())).toBe(false)
		expect(isUnset([])).toBe(true)
		expect(isUnset([""])).toBe(true)
		expect(isUnset(["a"])).toBe(false)
		expect(isUnset("")).toBe(true)
		expect(isUnset("x")).toBe(false)
	})
})

describe("lib/uuid", () => {
	test("encodes and decodes ids", () => {
		const encoded = encodeId("User", 42)
		expect(decodeId(encoded)).toEqual({ model: "User", id: "42" })
	})
})

describe("lib/units", () => {
	test("converts rem values to px numbers", () => {
		expect(typeof px("1rem")).toBe("number")
	})
})
