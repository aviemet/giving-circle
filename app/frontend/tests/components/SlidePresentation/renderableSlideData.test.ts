import { describe, expect, test } from "vitest"

import { renderableSlideData } from "@/components/SlidePresentation/renderableSlideData"
import { createSlideData } from "@/tests/helpers/fixtures"

describe("components/SlidePresentation/renderableSlideData", () => {
	test("returns empty puck data when slide data is null", () => {
		expect(renderableSlideData(null)).toEqual({
			content: [],
			root: {
				props: {},
			},
		})
	})

	test("fills missing root when slide data has no root", () => {
		expect(renderableSlideData({ content: [] })).toEqual({
			content: [],
			root: {
				props: {},
			},
		})
	})

	test("passes through slides that already have a root", () => {
		const data = createSlideData({
			content: [
				{
					type: "Heading",
					props: {
						id: "heading-1",
						title: "Hello",
						padding: 16,
						order: 1,
						color: "#ffffff",
						alignment: "left",
					},
				},
			],
		})

		expect(renderableSlideData(data)).toBe(data)
	})
})
