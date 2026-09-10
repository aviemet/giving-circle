import { describe, expect, test } from "vitest"

import { buildContainerStyle } from "@/components/VisualEditor/components/Container/buildContainerStyle"
import { containerConfig } from "@/components/VisualEditor/components/Container/containerConfig"
import {
	buildBorderStyle,
	defaultBorderValue,
	normalizeBorderValue,
} from "@/components/VisualEditor/fields/border"

describe("components/VisualEditor/fields/border", () => {
	test("normalizeBorderValue fills the current grouped value", () => {
		expect(normalizeBorderValue({
			borderWidth: 4,
			borderRadius: 8,
			borderColor: "#112233",
		})).toEqual({
			borderWidth: { amount: 4, unit: "px" },
			borderRadius: { amount: 8, unit: "px" },
			borderColor: "#112233",
		})

		expect(normalizeBorderValue({
			borderWidth: 3,
			borderColor: "#000000",
		})).toEqual({
			borderWidth: { amount: 3, unit: "px" },
			borderRadius: undefined,
			borderColor: "#000000",
		})
	})

	test("buildBorderStyle sets solid style when width is positive", () => {
		expect(buildBorderStyle({ borderWidth: 2, borderColor: "#fff" })).toEqual({
			borderWidth: "2px",
			borderColor: "#fff",
			borderStyle: "solid",
		})
		expect(buildBorderStyle({
			borderWidth: { amount: 0.25, unit: "rem" },
			borderRadius: { amount: 50, unit: "%" },
			borderColor: "#fff",
		})).toEqual({
			borderWidth: "0.25rem",
			borderRadius: "50%",
			borderColor: "#fff",
			borderStyle: "solid",
		})
		expect(buildBorderStyle(defaultBorderValue())).toEqual({})
	})
})

describe("components/VisualEditor/Container fields", () => {
	test("uses grouped background and border fields", () => {
		expect(containerConfig.fields).toHaveProperty("background")
		expect(containerConfig.fields).toHaveProperty("border")
		expect(containerConfig.fields).not.toHaveProperty("backgroundColor")
		expect(containerConfig.fields).not.toHaveProperty("borderWidth")
		expect(containerConfig.fields).not.toHaveProperty("width")
	})

	test("buildContainerStyle applies background and border from grouped props", () => {
		const style = buildContainerStyle(
			{
				background: {
					color: "#112233",
					image: {
						url: "",
						size: "cover",
						customSize: "100% 100%",
						offsetX: "center",
						offsetY: "center",
						repeat: "no-repeat",
						attachment: "scroll",
					},
				},
				border: {
					borderWidth: 2,
					borderRadius: 4,
					borderColor: "#ffffff",
				},
				flex: {
					display: "flex",
					overflow: "hidden",
				},
			},
			{ mode: "fill" },
		)

		expect(style.backgroundColor).toBe("#112233")
		expect(style.borderWidth).toBe("2px")
		expect(style.borderRadius).toBe("4px")
		expect(style.borderColor).toBe("#ffffff")
		expect(style.borderStyle).toBe("solid")
	})
})
