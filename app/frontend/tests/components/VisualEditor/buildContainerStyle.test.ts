import { describe, expect, test } from "vitest"

import { buildContainerStyle } from "@/components/VisualEditor/components/Container/buildContainerStyle"
import { SLOT_MIN_EMPTY_HEIGHT } from "@/components/VisualEditor/slotEditor"

describe("components/VisualEditor/buildContainerStyle", () => {
	test("presentation fill keeps collapsing minHeight", () => {
		const style = buildContainerStyle(
			{
				flex: {
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				},
			},
			{ mode: "fill" },
			false,
		)

		expect(style.minHeight).toBe(0)
	})

	test("editor overrides fill minHeight with slot floor", () => {
		const style = buildContainerStyle(
			{
				flex: {
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				},
			},
			{ mode: "fill" },
			true,
		)

		expect(style.minHeight).toBe(`${ SLOT_MIN_EMPTY_HEIGHT }px`)
	})

	test("editor keeps author minHeight when set", () => {
		const style = buildContainerStyle(
			{
				minHeight: "200px",
				flex: {
					display: "flex",
					overflow: "hidden",
				},
			},
			{ mode: "fill" },
			true,
		)

		expect(style.minHeight).toBe("200px")
	})
})
