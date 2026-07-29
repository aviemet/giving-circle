import React from "react"
import { describe, expect, test } from "vitest"

import { ColorPickerComponent } from "@/components/ColorPicker"
import { render } from "@/tests/helpers/utils"

describe("components/ColorPicker", () => {
	test("renders with initial value", () => {
		render(<ColorPickerComponent initialValue="#112233" withPreview />)
		expect(document.body).toBeTruthy()
	})
})
