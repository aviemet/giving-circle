import { describe, expect, test } from "vitest"

import { cardConfig } from "@/components/VisualEditor/components/Card"

describe("components/VisualEditor/components/Card", () => {
	test("title and description fields are first and use the tag field type", () => {
		expect(cardConfig.fields).toBeDefined()

		const fields = cardConfig.fields
		if(!fields) return

		const fieldKeys = Object.keys(fields)

		expect(fieldKeys.slice(0, 2)).toEqual(["title", "description"])
		expect(fields.title).toMatchObject({ type: "custom", label: "Title" })
		expect(fields.description).toMatchObject({ type: "custom", label: "Description" })
	})
})
