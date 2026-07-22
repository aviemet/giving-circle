import { describe, expect, it } from "vitest"

import {
	buildDefaultActions,
	buildSpotlightActions,
	filterSpotlightValues,
} from "@/features/Spotlight/spotlightActions"

describe("spotlightActions", () => {
	it("filters circle records by query", () => {
		const values = {
			orgs: [
				{ id: "1", name: "Alpha Org", slug: "alpha", description: "First" },
				{ id: "2", name: "Beta Org", slug: "beta", description: "Second" },
			],
			themes: [],
			memberships: [],
			templates: [],
			presentations: [],
		}

		const filtered = filterSpotlightValues(values, "alpha")

		expect(filtered.orgs).toHaveLength(1)
		expect(filtered.orgs[0]?.name).toBe("Alpha Org")
	})

	it("builds circle navigation defaults when a circle slug is present", () => {
		const actions = buildDefaultActions("battery-powered")

		expect(actions.some((action) => action.id === "themes")).toBe(true)
		expect(actions.some((action) => action.id === "circles")).toBe(true)
	})

	it("returns search actions for matching records", () => {
		const actions = buildSpotlightActions("alpha", "battery-powered", {
			orgs: [{ id: "1", name: "Alpha Org", slug: "alpha", description: "First" }],
			themes: [],
			memberships: [],
			templates: [],
			presentations: [],
		})

		expect(actions).toHaveLength(1)
		expect(actions[0]?.label).toBe("Alpha Org")
	})
})
