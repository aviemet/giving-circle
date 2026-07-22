import { describe, expect, test } from "vitest"

import { cardConfig } from "@/components/VisualEditor/components/Card"

describe("components/VisualEditor/components/Card", () => {
	test("title, description, and sizing fields are first and use expected field types", () => {
		expect(cardConfig.fields).toBeDefined()

		const fields = cardConfig.fields
		if(!fields) return

		const fieldKeys = Object.keys(fields)

		expect(fieldKeys.slice(0, 3)).toEqual(["title", "description", "sizing"])
		expect(fields.title).toMatchObject({ type: "custom", label: "Title" })
		expect(fields.description).toMatchObject({ type: "custom", label: "Description" })
		expect(fields.sizing).toMatchObject({ type: "custom" })
		expect(fields).not.toHaveProperty("width")
		expect(fields).not.toHaveProperty("minWidth")
		expect(fields).not.toHaveProperty("minHeight")
	})
})
