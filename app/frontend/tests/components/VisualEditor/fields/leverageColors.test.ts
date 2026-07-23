import { describe, expect, test } from "vitest"

import {
	defaultLeverageColors,
	normalizeLeverageColors,
} from "@/components/VisualEditor/fields/leverageColors"

describe("components/VisualEditor/fields/leverageColors", () => {
	test("defaults include zero radius", () => {
		expect(defaultLeverageColors()).toEqual({
			remainingColor: "#7CFF2B",
			trackColor: "#1B2A4A",
			borderRadius: 0,
		})
	})

	test("normalize merges legacy flat color props", () => {
		expect(normalizeLeverageColors(undefined, {
			remainingColor: "#111111",
			trackColor: "#222222",
			borderRadius: 8,
		})).toEqual({
			remainingColor: "#111111",
			trackColor: "#222222",
			borderRadius: 8,
		})
	})
})
