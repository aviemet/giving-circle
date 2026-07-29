import { describe, expect, test } from "vitest"

import { px } from "@/lib/units"

describe("lib/units", () => {
	test("converts rem strings to px numbers", () => {
		expect(typeof px("1rem")).toBe("number")
		expect(px("16px")).toBe(16)
	})
})
