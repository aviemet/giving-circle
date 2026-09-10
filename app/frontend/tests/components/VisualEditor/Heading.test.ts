import { describe, expect, test } from "vitest"

import { headingConfig } from "@/components/VisualEditor/components/Heading"
import {
	defaultTextFontValue,
	normalizeTextFontValue,
	resolveFontSize,
	defaultFlexibleFontSize,
} from "@/components/VisualEditor/fields/font"
import { normalizeHeadingMetrics } from "@/components/VisualEditor/fields/headingMetrics"
import { normalizeTextFlow } from "@/components/VisualEditor/fields/textFlow"
import { normalizeTypeStyle } from "@/components/VisualEditor/fields/typography"

describe("components/VisualEditor/components/Heading", () => {
	test("exposes dense metrics, font, style, and flow fields", () => {
		expect(headingConfig.fields).toBeDefined()

		const fields = headingConfig.fields
		if(!fields) return

		expect(Object.keys(fields)).toEqual([
			"title",
			"metrics",
			"font",
			"typeStyle",
			"alignment",
			"flow",
		])
		expect(fields.title).toMatchObject({ type: "custom", label: "Title" })
		expect(fields.metrics).toMatchObject({ type: "custom", label: "Heading" })
		expect(fields.font).toMatchObject({ type: "custom", label: "Font" })
		expect(fields.typeStyle).toMatchObject({ type: "custom", label: "Style" })
		expect(fields.alignment).toMatchObject({ type: "custom", label: "Alignment" })
		expect(fields.flow).toMatchObject({ type: "custom", label: "Flow" })
		expect(fields).not.toHaveProperty("color")
		expect(fields).not.toHaveProperty("fw")
		expect(fields).not.toHaveProperty("size")
	})

	test("defaults nest color and auto size under font", () => {
		expect(headingConfig.defaultProps).toMatchObject({
			metrics: { order: 1, padding: { amount: 16, unit: "px" } },
			font: defaultTextFontValue({
				color: "#FFFFFF",
				sizePreset: "auto",
			}),
			typeStyle: { fw: 700, td: "none", tt: "none", fs: "normal" },
			alignment: "left",
			flow: { lineClamp: 0, textWrap: "wrap" },
		})
	})

	test("normalizeHeadingMetrics fills defaults for the current metrics object", () => {
		expect(normalizeHeadingMetrics(
			{ order: 3, padding: 8 },
		)).toEqual({ order: 3, padding: { amount: 8, unit: "px" } })

		expect(normalizeHeadingMetrics(undefined)).toEqual({
			order: 1,
			padding: { amount: 16, unit: "px" },
		})
	})

	test("normalizeTextFontValue and resolveFontSize support clamp", () => {
		expect(normalizeTextFontValue({
			family: "Georgia",
			url: "",
			color: "#abc",
			size: defaultFlexibleFontSize("xl"),
		})).toMatchObject({
			family: "Georgia",
			color: "#abc",
			size: { mode: "preset", preset: "xl" },
		})

		expect(resolveFontSize({
			mode: "clamp",
			preset: "md",
			custom: "",
			clampMin: "1rem",
			clampPreferred: "4vw",
			clampMax: "4rem",
		})).toEqual({
			fontSize: "clamp(1rem, 4vw, 4rem)",
		})

		expect(resolveFontSize({
			mode: "preset",
			preset: "4xl",
			custom: "",
			clampMin: "1rem",
			clampPreferred: "5vw",
			clampMax: "3rem",
		})).toEqual({
			fontSize: "4.5rem",
		})
	})

	test("resolveFontSize maps Auto and heading presets through the slide scale", () => {
		const autoSize = defaultFlexibleFontSize("auto")

		expect(resolveFontSize(autoSize, 1)).toEqual({ fontSize: "4.25rem" })
		expect(resolveFontSize(autoSize, 3)).toEqual({ fontSize: "2.5rem" })
		expect(resolveFontSize(autoSize)).toEqual({})

		expect(resolveFontSize(defaultFlexibleFontSize("h1"))).toEqual({ fontSize: "4.25rem" })
		expect(resolveFontSize(defaultFlexibleFontSize("5xl"))).toEqual({ fontSize: "6rem" })
		expect(resolveFontSize(defaultFlexibleFontSize("6xl"))).toEqual({ fontSize: "8rem" })
	})

	test("normalizeTypeStyle fills missing keys from the fallback weight", () => {
		expect(normalizeTypeStyle(
			{ fw: 500, td: "underline", tt: "uppercase", fs: "italic" },
			700,
		)).toEqual({ fw: 500, td: "underline", tt: "uppercase", fs: "italic" })
		expect(normalizeTypeStyle(undefined, 700).fw).toBe(700)
	})

	test("normalizeTextFlow fills defaults", () => {
		expect(normalizeTextFlow(undefined)).toEqual({ lineClamp: 0, textWrap: "wrap" })
		expect(normalizeTextFlow({ lineClamp: 2, textWrap: "balance" })).toEqual({
			lineClamp: 2,
			textWrap: "balance",
		})
	})

	test("resolveData normalizes the current grouped heading fields", async () => {
		expect(headingConfig.resolveData).toBeDefined()
		if(headingConfig.resolveData === undefined) return

		const resolved = await headingConfig.resolveData(
			{
				props: {
					id: "heading-resolve",
					title: "Hello",
					alignment: "left",
					metrics: { order: 2, padding: 24 },
					font: {
						family: "",
						url: "",
						color: "#fff",
						size: defaultFlexibleFontSize("h2"),
					},
					typeStyle: {
						fw: 700,
						td: "underline",
						tt: "uppercase",
						fs: "italic",
					},
					flow: { lineClamp: 3, textWrap: "balance" },
				},
				readOnly: {},
			},
			{
				changed: {},
				lastData: { props: { id: "heading-resolve", title: "Hello", alignment: "left" }, readOnly: {} },
				trigger: "load",
				metadata: {},
				parent: null,
				root: { props: {} },
			},
		)

		expect(resolved.props).toBeDefined()
		const props = resolved.props
		if(props === undefined) {
			return
		}

		expect(props.metrics).toEqual({ order: 2, padding: { amount: 24, unit: "px" } })
		expect(props.font).toMatchObject({
			family: "",
			url: "",
			color: "#fff",
			size: { mode: "preset", preset: "h2" },
		})
		expect(props.typeStyle).toEqual({
			fw: 700,
			td: "underline",
			tt: "uppercase",
			fs: "italic",
		})
		expect(props.flow).toEqual({ lineClamp: 3, textWrap: "balance" })
	})
})
