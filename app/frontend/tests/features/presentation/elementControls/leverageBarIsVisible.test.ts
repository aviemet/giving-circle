import { describe, expect, test } from "vitest"

import { leverageBarIsVisible } from "@/features/presentation/elementControls"

describe("features/presentation/elementControls/leverageBarIsVisible", () => {
	test("uses the live override when present", () => {
		expect(leverageBarIsVisible("slide-1", "leverage-bar-1", {
			"slide-1": {
				"leverage-bar-1": {
					LeverageBar: {
						visibility: { visible: false },
					},
				},
			},
		})).toBe(false)
	})

	test("is visible when no override exists", () => {
		expect(leverageBarIsVisible("slide-1", "missing-leverage-bar", {
			"slide-1": {
				"leverage-bar-1": {
					LeverageBar: {
						visibility: { visible: false },
					},
				},
			},
		})).toBe(true)
	})
})
