import { describe, expect, test } from "vitest"

import { NestedURLSearchParams } from "@/lib/Collections/NestedURLSearchParams"

describe("lib/Collections/NestedURLSearchParams", () => {
	test("builds from string, URLSearchParams, and object", () => {
		const fromString = new NestedURLSearchParams("a=1&b=2")
		expect(fromString.get("a")).toBe("1")
		expect(fromString.get("b")).toBe("2")

		const fromParams = new NestedURLSearchParams(new URLSearchParams("x=9"))
		expect(fromParams.get("x")).toBe("9")

		const fromObject = new NestedURLSearchParams({ nested: { key: "value" } })
		expect(fromObject.get("nested.key")).toBe("value")
	})

	test("set unset isEmpty entries keys values clone", () => {
		const params = new NestedURLSearchParams()
		expect(params.isEmpty()).toBe(true)

		params.set("filter.name", "Ada")
		expect(params.get("filter.name")).toBe("Ada")
		expect(params.keys()).toEqual(["filter"])
		expect(params.values()).toEqual([{ name: "Ada" }])
		expect(params.entries()).toEqual([["filter", { name: "Ada" }]])

		const clone = params.clone()
		expect(clone.get("filter.name")).toBe("Ada")

		params.unset("filter")
		expect(params.isEmpty()).toBe(true)
	})

	test("toString serializes nested keys and skips empty values", () => {
		const params = new NestedURLSearchParams({
			filter: { name: "Ada", empty: "" },
			page: 2,
		})
		const query = params.toString()
		expect(query.startsWith("?")).toBe(true)
		expect(query).toContain("filter[name]=Ada")
		expect(query).toContain("page=2")
		expect(query).not.toContain("empty")
	})

	test("iterator yields entries", () => {
		const params = new NestedURLSearchParams({ a: "1" })
		expect([...params]).toEqual([["a", "1"]])
	})
})
