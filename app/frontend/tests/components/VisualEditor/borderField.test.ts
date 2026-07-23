import { describe, expect, test } from "vitest"

import { buildContainerStyle } from "@/components/VisualEditor/components/Container/buildContainerStyle"
import { containerConfig } from "@/components/VisualEditor/components/Container/containerConfig"
import {
	buildBorderStyle,
	defaultBorderValue,
	normalizeBorderValue,
} from "@/components/VisualEditor/fields/border"

describe("components/VisualEditor/fields/border", () => {
	test("normalizeBorderValue prefers grouped values over legacy props", () => {
		expect(normalizeBorderValue(
			{ borderWidth: 4, borderRadius: 8, borderColor: "#112233" },
			{ borderWidth: 1, borderRadius: 2, borderColor: "#abcdef" },
		)).toEqual({
			borderWidth: 4,
			borderRadius: 8,
			borderColor: "#112233",
		})

		expect(normalizeBorderValue(undefined, {
			borderWidth: 3,
			borderColor: "#000000",
		})).toEqual({
			borderWidth: 3,
			borderRadius: undefined,
			borderColor: "#000000",
		})
	})

	test("buildBorderStyle sets solid style when width is positive", () => {
		expect(buildBorderStyle({ borderWidth: 2, borderColor: "#fff" })).toEqual({
			borderWidth: 2,
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
			false,
		)

		expect(style.backgroundColor).toBe("#112233")
		expect(style.borderWidth).toBe(2)
		expect(style.borderRadius).toBe(4)
		expect(style.borderColor).toBe("#ffffff")
		expect(style.borderStyle).toBe("solid")
	})

	test("buildContainerStyle reads legacy flat background and border props", () => {
		const style = buildContainerStyle(
			{
				backgroundColor: "#abcdef",
				borderWidth: 1,
				borderColor: "#000000",
				flex: {
					display: "flex",
					overflow: "hidden",
				},
			},
			{ mode: "fill" },
			false,
		)

		expect(style.backgroundColor).toBe("#abcdef")
		expect(style.borderWidth).toBe(1)
		expect(style.borderColor).toBe("#000000")
	})
})
