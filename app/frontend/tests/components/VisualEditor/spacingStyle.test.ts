import { describe, expect, test } from "vitest"

import { buildSpacingStyle, resolveSpacingGroups } from "@/components/VisualEditor/fields/spacing"
import { config } from "@/components/VisualEditor/puck.config"

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

	test("prefers combined spacing prop over legacy margin and padding", () => {
		expect(resolveSpacingGroups({
			margin: { top: 1, right: 0, bottom: 0, left: 0, unit: "px" },
			spacing: {
				margin: { top: 8, right: 0, bottom: 0, left: 0, unit: "px" },
				padding: { top: 4, right: 4, bottom: 4, left: 4, unit: "px" },
			},
		})).toMatchObject({
			margin: { top: 8, unit: "px" },
			padding: { top: 4, unit: "px" },
		})

		expect(buildSpacingStyle({
			spacing: {
				margin: { top: 8, right: 0, bottom: 0, left: 0, unit: "px" },
				padding: { top: 2, right: 2, bottom: 2, left: 2, unit: "rem" },
			},
		})).toMatchObject({
			marginTop: "8px",
			paddingTop: "2rem",
		})
	})
})

describe("components/VisualEditor/puck.config root spacing", () => {
	test("root exposes spacing field and default", () => {
		expect(config.root?.fields?.spacing).toMatchObject({ type: "custom", label: "Spacing" })
		expect(config.root?.defaultProps).toMatchObject({
			spacing: {
				margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
				padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			},
		})
	})
})
