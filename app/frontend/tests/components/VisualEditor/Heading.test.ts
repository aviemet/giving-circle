import { describe, expect, test } from "vitest"

import { headingConfig } from "@/components/VisualEditor/components/Heading"

describe("components/VisualEditor/components/Heading", () => {
	test("exposes typography and alignment fields", () => {
		expect(headingConfig.fields).toBeDefined()

		const fields = headingConfig.fields
		if(!fields) return

		expect(Object.keys(fields)).toEqual([
			"title",
			"padding",
			"order",
			"size",
			"color",
			"fw",
			"td",
			"tt",
			"fs",
			"font",
			"alignment",
			"lineClamp",
			"textWrap",
		])
		expect(fields.title).toMatchObject({ type: "custom", label: "Title" })
		expect(fields.size).toMatchObject({ type: "select", label: "Size" })
		expect(fields.fw).toMatchObject({ type: "select", label: "Font Weight" })
		expect(fields.td).toMatchObject({ type: "select", label: "Text Decoration" })
		expect(fields.tt).toMatchObject({ type: "select", label: "Text Transform" })
		expect(fields.fs).toMatchObject({ type: "select", label: "Font Style" })
		expect(fields.font).toMatchObject({ type: "custom", label: "Font" })
		expect(fields.alignment).toMatchObject({ type: "custom", label: "Alignment" })
		expect(fields.lineClamp).toMatchObject({ type: "number", label: "Line Clamp" })
		expect(fields.textWrap).toMatchObject({ type: "select", label: "Text Wrap" })
	})

	test("defaults keep order-driven size and bold weight", () => {
		expect(headingConfig.defaultProps).toMatchObject({
			order: 1,
			size: "auto",
			fw: 700,
			td: "none",
			tt: "none",
			fs: "normal",
			font: { family: "", url: "" },
			alignment: "left",
			lineClamp: 0,
			textWrap: "wrap",
		})
	})
})
