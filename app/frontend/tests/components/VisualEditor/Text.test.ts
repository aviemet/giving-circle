import { describe, expect, test } from "vitest"

import { textConfig } from "@/components/VisualEditor/components/Text"

describe("components/VisualEditor/components/Text", () => {
	test("exposes Mantine Text props as editor fields", () => {
		expect(textConfig.fields).toBeDefined()

		const fields = textConfig.fields
		if(!fields) return

		expect(Object.keys(fields)).toEqual([
			"content",
			"size",
			"color",
			"fw",
			"td",
			"tt",
			"fs",
			"font",
			"alignment",
			"lineClamp",
			"truncate",
			"inline",
			"inherit",
			"span",
			"textWrap",
		])
		expect(fields.content).toMatchObject({ type: "custom", label: "Content" })
		expect(fields.size).toMatchObject({ type: "select", label: "Size" })
		expect(fields.color).toMatchObject({ type: "custom", label: "Color" })
		expect(fields.fw).toMatchObject({ type: "select", label: "Font Weight" })
		expect(fields.td).toMatchObject({ type: "select", label: "Text Decoration" })
		expect(fields.tt).toMatchObject({ type: "select", label: "Text Transform" })
		expect(fields.fs).toMatchObject({ type: "select", label: "Font Style" })
		expect(fields.font).toMatchObject({ type: "custom", label: "Font" })
		expect(fields.alignment).toMatchObject({ type: "custom", label: "Alignment" })
		expect(fields.lineClamp).toMatchObject({ type: "number", label: "Line Clamp" })
		expect(fields.truncate).toMatchObject({ type: "select", label: "Truncate" })
		expect(fields.inline).toMatchObject({ type: "radio", label: "Inline" })
		expect(fields.inherit).toMatchObject({ type: "radio", label: "Inherit" })
		expect(fields.span).toMatchObject({ type: "radio", label: "Span" })
		expect(fields.textWrap).toMatchObject({ type: "select", label: "Text Wrap" })
	})

	test("default props match Mantine Text defaults where applicable", () => {
		expect(textConfig.defaultProps).toMatchObject({
			size: "md",
			fw: 400,
			td: "none",
			tt: "none",
			fs: "normal",
			font: { family: "", url: "" },
			alignment: "left",
			lineClamp: 0,
			truncate: "none",
			inline: false,
			inherit: false,
			span: false,
			textWrap: "wrap",
		})
	})

	test("alignment uses the shared visual alignment field", () => {
		const fields = textConfig.fields
		if(!fields) return

		expect(fields.alignment).toMatchObject({ type: "custom", label: "Alignment" })
		expect(fields).not.toHaveProperty("ta")
	})
})
