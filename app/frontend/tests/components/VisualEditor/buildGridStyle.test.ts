import { describe, expect, test } from "vitest"

import { buildGridEditorStyle, buildGridStyle } from "@/components/VisualEditor/components/Grid/buildGridStyle"
import { gridConfig } from "@/components/VisualEditor/components/Grid/gridConfig"
import { DEFAULT_GRID_GAP, defaultGridLayoutValue } from "@/components/VisualEditor/fields/grid"
import {
	LAYOUT_CHROME_LABEL_SPACE_PX,
	LAYOUT_CHROME_PAD_PX,
	SLOT_MIN_EMPTY_HEIGHT,
} from "@/components/VisualEditor/lib/slotEditor"

describe("components/VisualEditor/buildGridStyle", () => {
	test("presentation fill keeps collapsing minHeight when overflow is hidden", () => {
		const style = buildGridStyle(
			{},
			{
				...defaultGridLayoutValue(),
				overflow: "hidden",
			},
			{ mode: "fill" },
		)

		expect(style.minHeight).toBe(0)
		expect(style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))")
	})

	test("editor fill keeps a slot floor so empty drop zones cannot collapse", () => {
		const style = buildGridEditorStyle(
			{},
			{
				...defaultGridLayoutValue(),
				overflow: "hidden",
			},
			{ mode: "fill" },
		)

		expect(style.minHeight).toBe(`${ SLOT_MIN_EMPTY_HEIGHT }px`)
		expect(style.flexGrow).toBe(1)
	})

	test("editor adds layout chrome padding on top of author padding", () => {
		const style = buildGridEditorStyle(
			{
				spacing: {
					margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
					padding: { top: 8, right: 4, bottom: 8, left: 4, unit: "px" },
				},
			},
			defaultGridLayoutValue(),
			{ mode: "fill" },
		)

		expect(style.paddingTop).toBe(`calc(8px + ${ LAYOUT_CHROME_LABEL_SPACE_PX }px)`)
		expect(style.paddingRight).toBe(`calc(4px + ${ LAYOUT_CHROME_PAD_PX }px)`)
		expect(style.paddingBottom).toBe(`calc(8px + ${ LAYOUT_CHROME_PAD_PX }px)`)
		expect(style.paddingLeft).toBe(`calc(4px + ${ LAYOUT_CHROME_PAD_PX }px)`)
	})

	test("presentation does not add layout chrome padding", () => {
		const style = buildGridStyle(
			{
				spacing: {
					margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
					padding: { top: 8, right: 4, bottom: 8, left: 4, unit: "px" },
				},
			},
			defaultGridLayoutValue(),
			{ mode: "fill" },
		)

		expect(style.paddingTop).toBe("8px")
		expect(style.paddingRight).toBe("4px")
	})
})

describe("components/VisualEditor/gridConfig", () => {
	test("grid is inline and uses grouped layout fields", () => {
		expect(gridConfig.inline).toBe(true)
		expect(gridConfig.fields?.grid).toBeTruthy()
		expect(gridConfig.fields?.sizing).toBeTruthy()
		expect(gridConfig.fields?.spacing).toBeTruthy()
		expect(gridConfig.fields?.background).toBeTruthy()
		expect(gridConfig.fields?.border).toBeTruthy()
		expect(gridConfig.fields).not.toHaveProperty("columns")
		expect(gridConfig.defaultProps?.grid).toEqual(defaultGridLayoutValue())
	})

	test("resolveData normalizes the current grid layout object", async () => {
		const resolveData = gridConfig.resolveData
		expect(resolveData).toBeTypeOf("function")
		if(!resolveData) {
			return
		}

		const resolved = await resolveData({
			props: {
				id: "grid-current",
				content: [],
				grid: { ...defaultGridLayoutValue(), columns: 4 },
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

		expect(resolvedProps.grid).toMatchObject({
			columns: 4,
			gap: DEFAULT_GRID_GAP,
			alignItems: "stretch",
			centerLastRow: false,
		})
	})
})
