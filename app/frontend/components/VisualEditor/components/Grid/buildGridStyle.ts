import { type CSSProperties } from "react"

import { type GridProps } from "./Grid"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildFlexItemSizingStyle, type FlexItemSizing } from "../../fields/flexItemSizing"
import {
	buildGridLayoutStyle,
	normalizeGridLayoutValue,
	type GridLayoutValue,
} from "../../fields/grid"
import { buildSpacingStyle } from "../../fields/spacing"
import { SLOT_MIN_EMPTY_HEIGHT, withEditorLayoutChromePadding } from "../../lib/slotEditor"

type GridStyleProps = Omit<GridProps, "content" | "grid" | "sizing" | "iterate">

export function buildGridStyle(
	styleProps: GridStyleProps,
	layout: GridLayoutValue,
	sizing: FlexItemSizing | undefined,
): CSSProperties {
	const background = normalizeBackgroundValue(styleProps.background)
	const border = normalizeBorderValue(styleProps.border)
	const resolvedLayout = normalizeGridLayoutValue(layout)

	return {
		...buildSpacingStyle(styleProps),
		...buildBorderStyle(border),
		...buildGridLayoutStyle(resolvedLayout),
		...buildFlexItemSizingStyle(sizing ?? { mode: "fill" }),
		...(hasBackgroundColor(background.color)
			? { backgroundColor: background.color }
			: {}),
		...buildBackgroundImageStyle(background.image),
	}
}

export function buildGridEditorStyle(
	styleProps: GridStyleProps,
	layout: GridLayoutValue,
	sizing: FlexItemSizing | undefined,
): CSSProperties {
	const style = buildGridStyle(styleProps, layout, sizing)
	style.minHeight = `${ SLOT_MIN_EMPTY_HEIGHT }px`

	return withEditorLayoutChromePadding(style)
}
