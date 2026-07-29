import { describe, expect, test } from "vitest"

import { backgroundColorField } from "@/components/VisualEditor/fields/color/fields"
import { minHeightField, minWidthField, widthField } from "@/components/VisualEditor/fields/dimension/fields"
import { marginField, paddingField } from "@/components/VisualEditor/fields/spacing/fields"

describe("VisualEditor field helpers", () => {
	test("dimension fields", () => {
		expect(widthField().type).toBe("text")
		expect(minWidthField().type).toBe("text")
		expect(minHeightField().type).toBe("text")
	})

	test("spacing fields", () => {
		expect(marginField().type).toBe("custom")
		expect(paddingField().type).toBe("custom")
	})

	test("color fields", () => {
		expect(backgroundColorField().type).toBe("custom")
	})
})
