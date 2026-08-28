import { describe, expect, test } from "vitest"

import { cardConfig } from "@/components/VisualEditor/components/Card"
import { defaultBorderValue } from "@/components/VisualEditor/fields/border"

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

	test("uses a grouped Border field instead of separate border widgets", () => {
		expect(cardConfig.fields).toHaveProperty("border")
		expect(cardConfig.fields).not.toHaveProperty("borderWidth")
		expect(cardConfig.fields).not.toHaveProperty("borderRadius")
		expect(cardConfig.fields).not.toHaveProperty("borderColor")
		expect(cardConfig.defaultProps?.border).toEqual(defaultBorderValue())
	})

	test("resolveData hydrates legacy flat border props into the grouped field", async () => {
		const resolveData = cardConfig.resolveData
		expect(resolveData).toBeTypeOf("function")
		if(!resolveData) {
			return
		}

		const defaultFlex = cardConfig.defaultProps?.flex
		if(defaultFlex === undefined) {
			throw new Error("expected Card default flex")
		}

		const resolved = await resolveData({
			props: {
				id: "card-legacy",
				title: "Topic Title",
				description: "Topic description...",
				backgroundColor: "#FEFEFE",
				fontColor: "#111111",
				flex: defaultFlex,
				borderWidth: 2,
				borderRadius: 8,
				borderColor: "#112233",
			},
		}, {
			changed: {},
			lastData: null,
			trigger: "load",
			metadata: {},
			parent: null,
			root: { props: {} },
		})

		const resolvedProps = resolved.props
		if(resolvedProps === undefined) {
			throw new Error("expected resolveData to return props")
		}

		expect(resolvedProps.border).toEqual({
			borderWidth: { amount: 2, unit: "px" },
			borderRadius: { amount: 8, unit: "px" },
			borderColor: "#112233",
		})
	})
})
