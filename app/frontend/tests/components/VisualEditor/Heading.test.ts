import { describe, expect, test } from "vitest"

import { headingConfig } from "@/components/VisualEditor/components/Heading"
import {
	defaultTextFontValue,
	normalizeTextFontValue,
	resolveFontSize,
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
			metrics: { order: 1, padding: 16 },
			font: defaultTextFontValue({
				color: "#FFFFFF",
				sizePreset: "auto",
			}),
			typeStyle: { fw: 700, td: "none", tt: "none", fs: "normal" },
			alignment: "left",
			flow: { lineClamp: 0, textWrap: "wrap" },
		})
	})

	test("normalizeHeadingMetrics prefers metrics over legacy props", () => {
		expect(normalizeHeadingMetrics(
			{ order: 3, padding: 8 },
			{ order: 1, padding: 16 },
		)).toEqual({ order: 3, padding: 8 })

		expect(normalizeHeadingMetrics(undefined, {
			order: 2,
			padding: 24,
		})).toEqual({ order: 2, padding: 24 })
	})

	test("normalizeTextFontValue and resolveFontSize support clamp", () => {
		expect(normalizeTextFontValue(undefined, {
			font: { family: "Georgia", url: "" },
			color: "#abc",
			size: "xl",
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

	test("normalizeTypeStyle prefers grouped values over legacy props", () => {
		expect(normalizeTypeStyle(
			{ fw: 500, td: "underline", tt: "uppercase", fs: "italic" },
			{ fw: 700, td: "none", tt: "none", fs: "normal" },
			700,
		)).toEqual({ fw: 500, td: "underline", tt: "uppercase", fs: "italic" })
	})

	test("normalizeTextFlow falls back to legacy lineClamp and textWrap", () => {
		expect(normalizeTextFlow(undefined, {
			lineClamp: 2,
			textWrap: "balance",
		})).toEqual({ lineClamp: 2, textWrap: "balance" })
	})

	test("resolveData hydrates font, metrics, typeStyle, and flow from legacy props", async () => {
		expect(headingConfig.resolveData).toBeDefined()
		if(headingConfig.resolveData === undefined) return

		const resolved = await headingConfig.resolveData(
			{
				props: {
					id: "heading-resolve",
					title: "Hello",
					order: 2,
					size: "h2",
					padding: 24,
					color: "#fff",
					fw: 700,
					td: "underline",
					tt: "uppercase",
					fs: "italic",
					alignment: "left",
					lineClamp: 3,
					textWrap: "balance",
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

		expect(props.metrics).toEqual({ order: 2, padding: 24 })
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
