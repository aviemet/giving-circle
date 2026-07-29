import { describe, expect, test } from "vitest"

import { coerceArray, exclude, flattenToPaths, renameObjectWithAttributes } from "@/lib/collections"

describe("lib/collections", () => {
	test("coerceArray wraps and normalizes", () => {
		expect(coerceArray(undefined)).toEqual([])
		expect(coerceArray(null)).toEqual([])
		expect(coerceArray("a")).toEqual(["a"])
		expect(coerceArray(["a", "b"])).toEqual(["a", "b"])
	})

	test("exclude removes keys", () => {
		expect(exclude({ a: 1, b: 2, c: 3 }, "b")).toEqual({ a: 1, c: 3 })
		expect(exclude({ a: 1, b: 2 }, ["a", "b"])).toEqual({})
	})

	test("renameObjectWithAttributes is identity", () => {
		const value = { a: 1 }
		expect(renameObjectWithAttributes(value)).toBe(value)
	})

	test("flattenToPaths walks nested objects and arrays", () => {
		expect(flattenToPaths({
			user: { name: "Ada", tags: ["a", "b"] },
			count: 2,
		})).toEqual([
			["user.name", "Ada"],
			["user.tags.0", "a"],
			["user.tags.1", "b"],
			["count", 2],
		])
	})
})
