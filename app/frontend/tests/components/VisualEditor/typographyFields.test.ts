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
	test("fontWeightField is a custom control", () => {
		const field = fontWeightField()
		expect(field).toMatchObject({ type: "custom", label: "Font weight" })
	})

	test("textDecorationField is a custom icon control", () => {
		const field = textDecorationField()
		expect(field).toMatchObject({ type: "custom", label: "Text decoration" })
	})

	test("textTransformField and fontStyleField are custom controls", () => {
		const transform = textTransformField()
		const style = fontStyleField()
		expect(transform.type).toBe("custom")
		expect(style.type).toBe("custom")
	})

	test("fontSizeField and titleSizeField remain selectable size controls", () => {
		const fontSize = fontSizeField()
		const titleSize = titleSizeField()
		expect(fontSize.type).toBe("custom")
		expect(titleSize.type).toBe("custom")
	})
})
