import { type CSSProperties } from "react"

import { type GridProps } from "./gridConfig"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildDimensionStyle } from "../../fields/dimension"
import { buildFlexItemSizingStyle, type FlexItemSizing } from "../../fields/flexItemSizing"
import {
	buildGridLayoutStyle,
	normalizeGridLayoutValue,
	type GridLayoutValue,
} from "../../fields/grid"
import { buildSpacingStyle } from "../../fields/spacing"
import { SLOT_MIN_EMPTY_HEIGHT, withEditorLayoutChromePadding } from "../../slotEditor"

type GridStyleProps = Omit<GridProps, "content" | "grid" | "columns" | "sizing" | "iterate">

export function buildGridStyle(
	styleProps: GridStyleProps,
	layout: GridLayoutValue,
	sizing: FlexItemSizing | undefined,
	isEditing: boolean,
): CSSProperties {
	const background = normalizeBackgroundValue(styleProps.background, {
		color: styleProps.backgroundColor,
	})
	const border = normalizeBorderValue(styleProps.border, {
		borderWidth: styleProps.borderWidth,
		borderRadius: styleProps.borderRadius,
		borderColor: styleProps.borderColor,
	})
	const resolvedLayout = normalizeGridLayoutValue(layout)

	const style: CSSProperties = {
		...buildSpacingStyle(styleProps),
		...buildBorderStyle(border),
		...buildDimensionStyle(styleProps),
		...buildGridLayoutStyle(resolvedLayout),
		...buildFlexItemSizingStyle(sizing ?? { mode: "fill" }),
		...(hasBackgroundColor(background.color)
			? { backgroundColor: background.color }
			: {}),
		...buildBackgroundImageStyle(background.image),
	}

	if(isEditing) {
		const authorMinHeight = buildDimensionStyle(styleProps).minHeight
		
		if(authorMinHeight !== undefined) {
			style.minHeight = authorMinHeight
		} else {
			style.minHeight = `${ SLOT_MIN_EMPTY_HEIGHT }px`
		}

		return withEditorLayoutChromePadding(style)
	}

	return style
}
