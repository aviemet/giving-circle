import { describe, expect, test } from "vitest"

import { headingsMap } from "@/pages/ThemeOrgs/Import/headingsMap"

describe("pages/ThemeOrgs/Import/headingsMap", () => {
	test("exposes mapping entries", () => {
		expect(headingsMap.length).toBeGreaterThan(0)
		expect(headingsMap[0].name).toBe("name")
	})
})
