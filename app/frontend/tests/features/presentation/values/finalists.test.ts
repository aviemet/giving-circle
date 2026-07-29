import { describe, expect, test } from "vitest"

import { isFinalistOrgId } from "@/features/presentation/values/finalists"

describe("features/presentation/values/finalists", () => {
	test("treats every org as finalist when the list is empty or missing", () => {
		expect(isFinalistOrgId(undefined, "org-1")).toBe(true)
		expect(isFinalistOrgId([], "org-1")).toBe(true)
	})

	test("matches only listed finalist org ids", () => {
		expect(isFinalistOrgId(["org-1", "org-2"], "org-1")).toBe(true)
		expect(isFinalistOrgId(["org-1", "org-2"], "org-3")).toBe(false)
	})
})
