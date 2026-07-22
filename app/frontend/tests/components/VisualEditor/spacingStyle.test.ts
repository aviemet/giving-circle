import { describe, expect, test } from "vitest"

import { buildSpacingStyle } from "@/components/VisualEditor/fields/spacing"

describe("components/VisualEditor/fields/spacing/style", () => {
	test("applies spacing values with the selected unit", () => {
		expect(buildSpacingStyle({
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
		expect(buildSpacingStyle({
			margin: { top: 16, right: 0, bottom: 0, left: 0 },
		})).toMatchObject({
			marginTop: "16px",
		})
	})
})
