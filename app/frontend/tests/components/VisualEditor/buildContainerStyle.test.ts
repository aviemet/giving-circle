import { describe, expect, test } from "vitest"

import { buildContainerStyle } from "@/components/VisualEditor/components/Container/buildContainerStyle"
import { containerConfig } from "@/components/VisualEditor/components/Container/containerConfig"
import {
	LAYOUT_CHROME_LABEL_SPACE_PX,
	LAYOUT_CHROME_PAD_PX,
	SLOT_MIN_EMPTY_HEIGHT,
	withEditorLayoutChromePadding,
} from "@/components/VisualEditor/slotEditor"

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

	test("editor fill keeps a slot floor so empty drop zones cannot collapse", () => {
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
		expect(style.flexGrow).toBe(1)
		expect(style.flexBasis).toBe(0)
	})

	test("editor applies slot floor for auto sizing", () => {
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
		expect(style.flexGrow).toBe(0)
		expect(style.height).toBe("auto")
	})

	test("presentation auto hugs content instead of filling leftover space", () => {
		const style = buildContainerStyle(
			{
				flex: {
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				},
			},
			{ mode: "auto" },
			false,
		)

		expect(style.flexGrow).toBe(0)
		expect(style.flexShrink).toBe(0)
		expect(style.flexBasis).toBe("auto")
		expect(style.height).toBe("auto")
		expect(style.minHeight).toBe("auto")
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

	test("editor adds layout chrome padding on top of author padding", () => {
		const style = buildContainerStyle(
			{
				spacing: {
					margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
					padding: { top: 8, right: 4, bottom: 8, left: 4, unit: "px" },
				},
				flex: {
					display: "flex",
					flexDirection: "column",
				},
			},
			{ mode: "fill" },
			true,
		)

		expect(style.paddingTop).toBe(`calc(8px + ${ LAYOUT_CHROME_LABEL_SPACE_PX }px)`)
		expect(style.paddingRight).toBe(`calc(4px + ${ LAYOUT_CHROME_PAD_PX }px)`)
		expect(style.paddingBottom).toBe(`calc(8px + ${ LAYOUT_CHROME_PAD_PX }px)`)
		expect(style.paddingLeft).toBe(`calc(4px + ${ LAYOUT_CHROME_PAD_PX }px)`)
	})

	test("presentation does not add layout chrome padding", () => {
		const style = buildContainerStyle(
			{
				spacing: {
					margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
					padding: { top: 8, right: 4, bottom: 8, left: 4, unit: "px" },
				},
				flex: {
					display: "flex",
				},
			},
			{ mode: "fill" },
			false,
		)

		expect(style.paddingTop).toBe("8px")
		expect(style.paddingRight).toBe("4px")
	})
})

describe("components/VisualEditor/withEditorLayoutChromePadding", () => {
	test("zero padding becomes the chrome inset", () => {
		expect(withEditorLayoutChromePadding({ paddingTop: "0px", paddingRight: 0 })).toMatchObject({
			paddingTop: `${ LAYOUT_CHROME_LABEL_SPACE_PX }px`,
			paddingRight: `${ LAYOUT_CHROME_PAD_PX }px`,
			paddingBottom: `${ LAYOUT_CHROME_PAD_PX }px`,
			paddingLeft: `${ LAYOUT_CHROME_PAD_PX }px`,
		})
	})
})

describe("components/VisualEditor/containerConfig", () => {
	test("container is inline so flex sizing applies without a Puck wrapper", () => {
		expect(containerConfig.inline).toBe(true)
	})
})
