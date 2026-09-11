import { type CSSProperties } from "react"

import { type ContainerProps } from "./Container"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildFlexStyle } from "../../fields/flex"
import { buildFlexItemSizingStyle, type FlexItemSizing } from "../../fields/flexItemSizing"
import { buildSpacingStyle } from "../../fields/spacing"
import { SLOT_MIN_EMPTY_HEIGHT, withEditorLayoutChromePadding } from "../../lib/slotEditor"

type ContainerStyleProps = Omit<ContainerProps, "content" | "alignment" | "sizing"> & {
	sizing?: FlexItemSizing
}

export function buildContainerStyle(
	styleProps: ContainerStyleProps,
	sizing: FlexItemSizing | undefined,
): CSSProperties {
	const background = normalizeBackgroundValue(styleProps.background)
	const border = normalizeBorderValue(styleProps.border)

	return {
		...buildSpacingStyle(styleProps),
		...buildBorderStyle(border),
		...buildFlexStyle(styleProps),
		...buildFlexItemSizingStyle(sizing ?? { mode: "fill" }),
		...(hasBackgroundColor(background.color)
			? { backgroundColor: background.color }
			: {}),
		...buildBackgroundImageStyle(background.image),
	}
}

export function buildContainerEditorStyle(
	styleProps: ContainerStyleProps,
	sizing: FlexItemSizing | undefined,
): CSSProperties {
	const style = buildContainerStyle(styleProps, sizing)
	style.minHeight = `${ SLOT_MIN_EMPTY_HEIGHT }px`

	return withEditorLayoutChromePadding(style)
}
