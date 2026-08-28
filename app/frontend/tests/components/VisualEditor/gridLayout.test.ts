import { describe, expect, test } from "vitest"

import {
	buildGridLayoutStyle,
	defaultGridLayoutValue,
	gridItemBasisCss,
	isGridAlignItems,
	isGridOverflow,
	normalizeGridColumns,
	normalizeGridGap,
	normalizeGridLayoutValue,
	DEFAULT_GRID_COLUMNS,
	DEFAULT_GRID_GAP,
} from "@/components/VisualEditor/fields/grid"

describe("components/VisualEditor/fields/grid", () => {
	test("defaults match a three-column SimpleGrid-sized layout", () => {
		expect(defaultGridLayoutValue()).toEqual({
			columns: DEFAULT_GRID_COLUMNS,
			gap: DEFAULT_GRID_GAP,
			alignItems: "stretch",
			overflow: "visible",
			centerLastRow: false,
		})
	})

	test("normalizeGridLayoutValue fills defaults and hydrates legacy columns", () => {
		expect(normalizeGridLayoutValue(undefined)).toEqual(defaultGridLayoutValue())
		expect(normalizeGridLayoutValue({}, { columns: 4 }).columns).toBe(4)
		expect(normalizeGridLayoutValue({ columns: 2, centerLastRow: true })).toMatchObject({
			columns: 2,
			gap: DEFAULT_GRID_GAP,
			centerLastRow: true,
		})
	})

	test("normalizeGridColumns and gap clamp invalid values", () => {
		expect(normalizeGridColumns(undefined)).toBe(DEFAULT_GRID_COLUMNS)
		expect(normalizeGridColumns(0)).toBe(1)
		expect(normalizeGridColumns(2.9)).toBe(2)
		expect(normalizeGridGap(undefined)).toEqual(DEFAULT_GRID_GAP)
		expect(normalizeGridGap(-4)).toEqual({ amount: 0, unit: "px" })
		expect(isGridAlignItems("stretch")).toBe(true)
		expect(isGridAlignItems("baseline")).toBe(false)
		expect(isGridOverflow("hidden")).toBe(true)
		expect(isGridOverflow("scroll")).toBe(false)
	})

	test("gridItemBasisCss sizes equal columns minus gap", () => {
		expect(gridItemBasisCss(1, 16)).toBe("100%")
		expect(gridItemBasisCss(3, 16)).toBe("calc((100% - 2 * 16px) / 3)")
		expect(gridItemBasisCss(3, { amount: 1, unit: "rem" })).toBe("calc((100% - 2 * 1rem) / 3)")
	})

	test("buildGridLayoutStyle emits grid tracks and overflow minHeight", () => {
		expect(buildGridLayoutStyle(defaultGridLayoutValue())).toMatchObject({
			gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
			gap: "16px",
			alignItems: "stretch",
			"--grid-cols": 3,
			"--grid-gap": "16px",
			"--grid-item-basis": "calc((100% - 2 * 16px) / 3)",
		})
		expect(buildGridLayoutStyle({
			...defaultGridLayoutValue(),
			overflow: "hidden",
		})).toMatchObject({
			overflow: "hidden",
			minHeight: 0,
		})
	})
})
