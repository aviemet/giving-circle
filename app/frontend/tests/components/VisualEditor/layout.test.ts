import { describe, expect, test } from "vitest"

import { buildLayoutStyle } from "@/components/VisualEditor/fields/layout"

describe("components/VisualEditor/fields/layout", () => {
	test("flex layout does not default to scrollable overflow", () => {
		expect(buildLayoutStyle({ flex: { display: "flex" } })).not.toHaveProperty("overflow", "auto")
	})

	test("normalizes bare numeric width and minHeight values to pixels", () => {
		expect(buildLayoutStyle({ width: "300", minWidth: "120", minHeight: "80" })).toEqual({
			width: "300px",
			minWidth: "120px",
			minHeight: "80px",
		})
	})

	test("applies minHeight zero only when overflow is auto or hidden", () => {
		expect(buildLayoutStyle({ flex: { display: "flex", overflow: "auto" } })).toMatchObject({
			overflow: "auto",
			minHeight: 0,
		})
	})
})
