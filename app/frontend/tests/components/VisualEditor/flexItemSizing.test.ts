import { describe, expect, test } from "vitest"

import {
	buildFlexItemSizingStyle,
	parseCustomCssDeclarations,
} from "@/components/VisualEditor/fields/flexItemSizing"

describe("components/VisualEditor/fields/flexItemSizing", () => {
	test("auto mode applies only fine tune overrides", () => {
		expect(buildFlexItemSizingStyle({
			mode: "auto",
			fineTune: { flexGrow: 2, alignSelf: "center" },
		})).toEqual({
			flexGrow: 2,
			alignSelf: "center",
		})
	})

	test("fixed mode sets width and optional max width", () => {
		expect(buildFlexItemSizingStyle({
			mode: "fixed",
			width: { amount: 48, unit: "%" },
			maxWidth: { amount: 400, unit: "px" },
		})).toEqual({
			width: "48%",
			maxWidth: "400px",
		})
	})

	test("fill mode sets flex child defaults with optional max width", () => {
		expect(buildFlexItemSizingStyle({
			mode: "fill",
			maxWidth: { amount: 50, unit: "%" },
		})).toEqual({
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: 0,
			minWidth: 0,
			maxWidth: "50%",
		})
	})

	test("clamp mode builds a clamp width expression", () => {
		expect(buildFlexItemSizingStyle({
			mode: "clamp",
			clamp: {
				min: { amount: 200, unit: "px" },
				preferred: { amount: 30, unit: "%" },
				max: { amount: 400, unit: "px" },
			},
		})).toEqual({
			width: "clamp(200px, 30%, 400px)",
		})
	})

	test("custom mode parses supported declarations", () => {
		expect(buildFlexItemSizingStyle({
			mode: "custom",
			custom: "flex: 1 1 280px; max-width: 50%; align-self: stretch",
		})).toEqual({
			flex: "1 1 280px",
			maxWidth: "50%",
			alignSelf: "stretch",
		})
	})

	test("fine tune overrides preset values", () => {
		expect(buildFlexItemSizingStyle({
			mode: "fill",
			fineTune: { flexGrow: 2 },
		})).toMatchObject({
			flexGrow: 2,
			flexShrink: 1,
			flexBasis: 0,
		})
	})

	test("undefined sizing returns no style", () => {
		expect(buildFlexItemSizingStyle(undefined)).toEqual({})
	})

	test("parseCustomCssDeclarations normalizes bare numeric values", () => {
		expect(parseCustomCssDeclarations("width: 300; flex-grow: 1")).toEqual({
			width: "300px",
			flexGrow: "1",
		})
	})

	test("parseCustomCssDeclarations ignores unsupported properties", () => {
		expect(parseCustomCssDeclarations("color: red; width: 50%")).toEqual({
			width: "50%",
		})
	})
})
