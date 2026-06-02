import { describe, expect, test } from "vitest"

import { cardConfig } from "@/components/VisualEditor/components/Card"

describe("components/VisualEditor/components/Card", () => {
	test("title and description fields are first and use the tag field type", () => {
		const fieldKeys = Object.keys(cardConfig.fields)

		expect(fieldKeys.slice(0, 2)).toEqual(["title", "description"])
		expect(cardConfig.fields.title).toMatchObject({ type: "custom", label: "Title" })
		expect(cardConfig.fields.description).toMatchObject({ type: "custom", label: "Description" })
	})
})
