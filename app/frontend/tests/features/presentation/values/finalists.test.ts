import { describe, expect, test } from "vitest"

import { filterFinalistOrgs, isFinalistOrgId } from "@/features/presentation/values/finalists"

describe("features/presentation/values/finalists", () => {
	test("treats every org as finalist when the list is empty or missing", () => {
		expect(isFinalistOrgId(undefined, "org-1")).toBe(true)
		expect(isFinalistOrgId([], "org-1")).toBe(true)
	})

	test("matches only listed finalist org ids", () => {
		expect(isFinalistOrgId(["org-1", "org-2"], "org-1")).toBe(true)
		expect(isFinalistOrgId(["org-1", "org-2"], "org-3")).toBe(false)
	})

	test("filterFinalistOrgs returns all orgs when finalist ids are empty or missing", () => {
		const orgs = [{ id: "org-1" }, { id: "org-2" }]

		expect(filterFinalistOrgs(orgs, undefined)).toEqual(orgs)
		expect(filterFinalistOrgs(orgs, [])).toEqual(orgs)
	})

	test("filterFinalistOrgs returns only listed orgs", () => {
		const orgs = [{ id: "org-1" }, { id: "org-2" }, { id: "org-3" }]

		expect(filterFinalistOrgs(orgs, ["org-1", "org-3"])).toEqual([
			{ id: "org-1" },
			{ id: "org-3" },
		])
	})
})
