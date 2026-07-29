import { describe, expect, test } from "vitest"

import { NestedObject } from "@/lib/Collections/NestedObject"

describe("lib/Collections/NestedObject", () => {
	test("sets gets unsets and iterates nested values", () => {
		const nested = new NestedObject({ "a.b": 1 })

		expect(nested.get("a.b")).toBe(1)
		nested.set("a.c", 2)
		expect(nested.get("a.c")).toBe(2)
		expect(nested.isEmpty()).toBe(false)
		expect(nested.keys()).toContain("a")
		expect(nested.values().length).toBeGreaterThan(0)
		expect([...nested.entries()].length).toBeGreaterThan(0)

		nested.unset("a.b")
		expect(nested.get("a.b")).toBeUndefined()
	})

	test("starts empty without initial data", () => {
		const nested = new NestedObject()
		expect(nested.isEmpty()).toBe(true)
	})
})
