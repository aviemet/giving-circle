import { describe, expect, test } from "vitest"

import {
	dimensionInputToCSSValue,
	formatDimensionValue,
	normalizeDimensionValue,
	parseDimensionValue,
} from "@/components/VisualEditor/fields/dimension"

describe("components/VisualEditor/fields/dimension", () => {
	test("normalizeDimensionValue converts bare numbers to pixels", () => {
		expect(normalizeDimensionValue("300")).toBe("300px")
	})

	test("normalizeDimensionValue passes through units and functions", () => {
		expect(normalizeDimensionValue("50%")).toBe("50%")
		expect(normalizeDimensionValue("40vh")).toBe("40vh")
		expect(normalizeDimensionValue("clamp(200px, 30%, 400px)")).toBe("clamp(200px, 30%, 400px)")
	})

	test("formatDimensionValue builds CSS values", () => {
		expect(formatDimensionValue(48, "%")).toBe("48%")
		expect(formatDimensionValue(200, "px")).toBe("200px")
		expect(formatDimensionValue(undefined, "px")).toBeUndefined()
		expect(formatDimensionValue(1, "auto")).toBe("auto")
	})

	test("parseDimensionValue detects auto, simple, and advanced values", () => {
		expect(parseDimensionValue("auto")).toEqual({ kind: "auto" })
		expect(parseDimensionValue("50%")).toEqual({ kind: "simple", amount: 50, unit: "%" })
		expect(parseDimensionValue("40vh")).toEqual({ kind: "simple", amount: 40, unit: "vh" })
		expect(parseDimensionValue("clamp(1px, 2%, 3px)")).toEqual({
			kind: "advanced",
			value: "clamp(1px, 2%, 3px)",
		})
	})

	test("dimensionInputToCSSValue formats stored inputs", () => {
		expect(dimensionInputToCSSValue({ amount: 30, unit: "%" })).toBe("30%")
		expect(dimensionInputToCSSValue({ unit: "auto" })).toBe("auto")
	})
})
