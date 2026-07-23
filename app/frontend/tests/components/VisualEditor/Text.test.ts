import { describe, expect, test } from "vitest"

import { textConfig } from "@/components/VisualEditor/components/Text"
import { defaultTextFontValue, normalizeTextFontValue } from "@/components/VisualEditor/fields/font"
import { normalizeTextFlow } from "@/components/VisualEditor/fields/textFlow"
import { normalizeTextLayout } from "@/components/VisualEditor/fields/textLayout"
import { normalizeTypeStyle } from "@/components/VisualEditor/fields/typography"

describe("components/VisualEditor/components/Text", () => {
	test("exposes dense font, style, flow, and layout fields", () => {
		expect(textConfig.fields).toBeDefined()

		const fields = textConfig.fields
		if(!fields) return

		expect(Object.keys(fields)).toEqual([
			"content",
			"font",
			"typeStyle",
			"alignment",
			"flow",
			"layout",
		])
		expect(fields.content).toMatchObject({ type: "custom", label: "Content" })
		expect(fields.font).toMatchObject({ type: "custom", label: "Font" })
		expect(fields.typeStyle).toMatchObject({ type: "custom", label: "Style" })
		expect(fields.alignment).toMatchObject({ type: "custom", label: "Alignment" })
		expect(fields.flow).toMatchObject({ type: "custom", label: "Flow" })
		expect(fields.layout).toMatchObject({ type: "custom", label: "Layout" })
		expect(fields).not.toHaveProperty("size")
		expect(fields).not.toHaveProperty("color")
		expect(fields).not.toHaveProperty("fw")
	})

	test("default props nest color and size under font", () => {
		expect(textConfig.defaultProps).toMatchObject({
			font: defaultTextFontValue({
				color: "#FFFFFF",
				sizePreset: "md",
			}),
			typeStyle: { fw: 400, td: "none", tt: "none", fs: "normal" },
			alignment: "left",
			flow: { lineClamp: 0, textWrap: "wrap", truncate: "none" },
			layout: { inline: false, inherit: false, span: false },
		})
	})

	test("normalize helpers prefer grouped values over legacy props", () => {
		expect(normalizeTextFontValue(
			{
				family: "Inter",
				url: "",
				color: "#112233",
				size: {
					mode: "custom",
					preset: "md",
					custom: "72px",
					clampMin: "1rem",
					clampPreferred: "5vw",
					clampMax: "3rem",
				},
			},
			{
				font: { family: "Old", url: "" },
				color: "#000",
				size: "sm",
			},
		)).toMatchObject({
			family: "Inter",
			color: "#112233",
			size: { mode: "custom", custom: "72px" },
		})

		expect(normalizeTypeStyle(
			{ fw: 500, td: "underline", tt: "uppercase", fs: "italic" },
			{ fw: 400, td: "none", tt: "none", fs: "normal" },
			400,
		)).toEqual({ fw: 500, td: "underline", tt: "uppercase", fs: "italic" })

		expect(normalizeTextFlow(
			{ lineClamp: 3, textWrap: "pretty", truncate: "end" },
			{ lineClamp: 1, textWrap: "wrap", truncate: "none" },
			true,
		)).toEqual({ lineClamp: 3, textWrap: "pretty", truncate: "end" })

		expect(normalizeTextLayout(
			{ inline: true, inherit: false, span: true },
			{ inline: false, inherit: true, span: false },
		)).toEqual({ inline: true, inherit: false, span: true })
	})

	test("resolveData hydrates font, typeStyle, flow, and layout from legacy props", async () => {
		expect(textConfig.resolveData).toBeDefined()
		if(textConfig.resolveData === undefined) return

		const resolved = await textConfig.resolveData(
			{
				props: {
					id: "text-resolve",
					content: "Body",
					size: "md",
					color: "#fff",
					fw: 400,
					td: "none",
					tt: "none",
					fs: "normal",
					alignment: "left",
					lineClamp: 2,
					textWrap: "pretty",
					truncate: "end",
					inline: true,
					inherit: false,
					span: true,
				},
				readOnly: {},
			},
			{
				changed: {},
				lastData: { props: { id: "text-resolve", content: "Body", alignment: "left" }, readOnly: {} },
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

		expect(props.font).toMatchObject({
			color: "#fff",
			size: { mode: "preset", preset: "md" },
		})
		expect(props.typeStyle).toEqual({
			fw: 400,
			td: "none",
			tt: "none",
			fs: "normal",
		})
		expect(props.flow).toEqual({
			lineClamp: 2,
			textWrap: "pretty",
			truncate: "end",
		})
		expect(props.layout).toEqual({
			inline: true,
			inherit: false,
			span: true,
		})
	})
})
