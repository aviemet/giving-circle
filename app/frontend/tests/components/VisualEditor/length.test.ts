import { describe, expect, test } from "vitest"

import {
	BORDER_RADIUS_UNITS,
	BORDER_WIDTH_UNITS,
	GAP_UNITS,
	SPACING_LENGTH_UNITS,
	coerceLength,
	lengthCss,
	lengthToCss,
	normalizeOptionalLength,
} from "@/components/VisualEditor/fields/shared/length"

describe("components/VisualEditor/fields/shared/length", () => {
	test("border width units are lengths without percentage", () => {
		expect(BORDER_WIDTH_UNITS).toEqual(["px", "rem", "em"])
		expect(BORDER_WIDTH_UNITS).not.toContain("%")
	})

	test("border radius, gap, and spacing units include percentage", () => {
		expect(BORDER_RADIUS_UNITS).toEqual(["px", "rem", "em", "%"])
		expect(GAP_UNITS).toEqual(["px", "rem", "em", "%"])
		expect(SPACING_LENGTH_UNITS).toEqual(["px", "rem", "em", "%"])
	})

	test("coerceLength hydrates a bare number as px", () => {
		expect(coerceLength(8, BORDER_WIDTH_UNITS, "px")).toEqual({ amount: 8, unit: "px" })
		expect(coerceLength(-4, GAP_UNITS, "px")).toEqual({ amount: 0, unit: "px" })
	})

	test("coerceLength keeps a valid unit and falls back for an unknown unit", () => {
		expect(coerceLength({ amount: 2, unit: "rem" }, BORDER_WIDTH_UNITS, "px")).toEqual({
			amount: 2,
			unit: "rem",
		})
		expect(coerceLength({ amount: 1, unit: "%" }, BORDER_WIDTH_UNITS, "px")).toEqual({
			amount: 1,
			unit: "px",
		})
	})

	test("normalizeOptionalLength leaves missing values empty", () => {
		expect(normalizeOptionalLength(undefined, BORDER_WIDTH_UNITS, "px")).toBeUndefined()
	})

	test("lengthToCss emits a CSS string and hydrates numbers as px", () => {
		expect(lengthCss({ amount: 12, unit: "%" })).toBe("12%")
		expect(lengthToCss(4)).toBe("4px")
		expect(lengthToCss({ amount: 1.5, unit: "rem" })).toBe("1.5rem")
		expect(lengthToCss(undefined)).toBeUndefined()
	})
})
