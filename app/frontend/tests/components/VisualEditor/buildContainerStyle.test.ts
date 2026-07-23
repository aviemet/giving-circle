import { describe, expect, test } from "vitest"

import { buildContainerStyle } from "@/components/VisualEditor/components/Container/buildContainerStyle"
import { containerConfig } from "@/components/VisualEditor/components/Container/containerConfig"
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

	test("editor keeps fill minHeight so flex can stretch", () => {
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

		expect(style.minHeight).toBe(0)
		expect(style.flexGrow).toBe(1)
		expect(style.flexBasis).toBe(0)
	})

	test("editor applies slot floor for non-fill sizing", () => {
		const style = buildContainerStyle(
			{
				flex: {
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				},
			},
			{ mode: "auto" },
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

describe("components/VisualEditor/containerConfig", () => {
	test("container is inline so flex sizing applies without a Puck wrapper", () => {
		expect(containerConfig.inline).toBe(true)
	})
})
