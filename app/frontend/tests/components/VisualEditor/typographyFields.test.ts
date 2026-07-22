import { describe, expect, test } from "vitest"

import {
	fontSizeField,
	fontStyleField,
	fontWeightField,
	textDecorationField,
	textTransformField,
	titleSizeField,
} from "@/components/VisualEditor/fields"

describe("components/VisualEditor/fields/typography", () => {
	test("fontWeightField exposes numeric weight options", () => {
		const field = fontWeightField()
		expect(field).toMatchObject({ type: "select", label: "Font Weight" })
		if(field.type !== "select") return
		expect(field.options.map(option => option.value)).toEqual([100, 200, 300, 400, 500, 600, 700, 800, 900])
	})

	test("textDecorationField includes underline", () => {
		const field = textDecorationField()
		expect(field).toMatchObject({ type: "select", label: "Text Decoration" })
		if(field.type !== "select") return
		expect(field.options.map(option => option.value)).toEqual([
			"none",
			"underline",
			"line-through",
			"overline",
		])
	})

	test("textTransformField and fontStyleField expose style options", () => {
		const transform = textTransformField()
		const style = fontStyleField()
		if(transform.type !== "select" || style.type !== "select") return
		expect(transform.options.map(option => option.value)).toEqual([
			"none",
			"uppercase",
			"lowercase",
			"capitalize",
		])
		expect(style.options.map(option => option.value)).toEqual(["normal", "italic"])
	})

	test("fontSizeField and titleSizeField expose size scales", () => {
		const fontSize = fontSizeField()
		const titleSize = titleSizeField()
		if(fontSize.type !== "select" || titleSize.type !== "select") return
		expect(fontSize.options.map(option => option.value)).toEqual(["xs", "sm", "md", "lg", "xl"])
		expect(titleSize.options[0]).toMatchObject({ value: "auto", label: "Auto (from level)" })
		expect(titleSize.options.map(option => option.value)).toContain("h1")
	})
})
