import { describe, expect, test } from "vitest"

import {
	defaultLeverageColors,
	normalizeLeverageColors,
} from "@/components/VisualEditor/fields/leverageColors"

describe("components/VisualEditor/fields/leverageColors", () => {
	test("defaults include zero radius", () => {
		expect(defaultLeverageColors).toEqual({
			remainingColor: "#7CFF2B",
			trackColor: "#1B2A4A",
			borderRadius: { amount: 0, unit: "px" },
		})
	})

	test("normalize fills missing color keys from defaults", () => {
		expect(normalizeLeverageColors({
			remainingColor: "#111111",
			trackColor: "#222222",
			borderRadius: 8,
		})).toEqual({
			remainingColor: "#111111",
			trackColor: "#222222",
			borderRadius: { amount: 8, unit: "px" },
		})
	})
})
