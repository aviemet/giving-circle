import { describe, expect, test } from "vitest"

import { scanSlideElements } from "@/features/presentation/elementControls"
import { createLeverageBarPuckNode, createSlideData, createTimerPuckNode } from "@/tests/helpers/fixtures"

describe("features/presentation/elementControls/scanSlideElements", () => {
	test("finds a top-level Timer", () => {
		const slideData = createSlideData({
			content: [createTimerPuckNode("timer-top")],
		})

		expect(scanSlideElements(slideData)).toEqual([
			{ elementId: "timer-top", elementType: "Timer" },
		])
	})

	test("finds a top-level LeverageBar", () => {
		const slideData = createSlideData({
			content: [createLeverageBarPuckNode("leverage-bar-top")],
		})

		expect(scanSlideElements(slideData)).toEqual([
			{ elementId: "leverage-bar-top", elementType: "LeverageBar" },
		])
	})

	test("finds a Timer nested in Container and Grid slots", () => {
		const slideData = {
			content: [
				{
					type: "Container",
					props: {
						id: "container-1",
						content: [
							{
								type: "Grid",
								props: {
									id: "grid-1",
									content: [createTimerPuckNode("timer-nested", "digital")],
								},
							},
						],
					},
				},
			],
		}

		expect(scanSlideElements(slideData)).toEqual([
			{ elementId: "timer-nested", elementType: "Timer" },
		])
	})

	test("ignores elements without ids or unsupported types", () => {
		const slideData = {
			content: [
				{
					type: "Heading",
					props: {
						id: "heading-1",
						title: "Hello",
					},
				},
				{
					type: "Timer",
					props: {
						displayType: "circle",
					},
				},
			],
		}

		expect(scanSlideElements(slideData)).toEqual([])
	})
})
