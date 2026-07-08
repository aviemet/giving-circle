import { describe, expect, test } from "vitest"

import { buildDimensionStyle } from "@/components/VisualEditor/fields/dimension"

describe("components/VisualEditor/fields/dimension/style", () => {
	test("normalizes bare numeric width and minHeight values to pixels", () => {
		expect(buildDimensionStyle({ width: "300", minWidth: "120", minHeight: "80" })).toEqual({
			width: "300px",
			minWidth: "120px",
			minHeight: "80px",
		})
	})

	test("passes through percent, viewport, and clamp values unchanged", () => {
		expect(buildDimensionStyle({ width: "50%", minWidth: "40vh" })).toEqual({
			width: "50%",
			minWidth: "40vh",
		})
		expect(buildDimensionStyle({ width: "clamp(200px, 30%, 400px)" })).toEqual({
			width: "clamp(200px, 30%, 400px)",
		})
	})
})
