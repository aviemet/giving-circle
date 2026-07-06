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

	test("applies spacing values with the selected unit", () => {
		expect(buildLayoutStyle({
			margin: { top: 8, right: 12, bottom: 8, left: 12, unit: "rem" },
			padding: { top: 4, right: 4, bottom: 4, left: 4, unit: "%" },
		})).toMatchObject({
			marginTop: "8rem",
			marginRight: "12rem",
			marginBottom: "8rem",
			marginLeft: "12rem",
			paddingTop: "4%",
			paddingRight: "4%",
			paddingBottom: "4%",
			paddingLeft: "4%",
		})
	})

	test("defaults legacy spacing values to pixels", () => {
		expect(buildLayoutStyle({
			margin: { top: 16, right: 0, bottom: 0, left: 0 },
		})).toMatchObject({
			marginTop: "16px",
		})
	})
})
