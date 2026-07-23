import { type CSSProperties } from "react"

import { type ContainerProps } from "./containerConfig"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildDimensionStyle } from "../../fields/dimension"
import { buildFlexStyle } from "../../fields/flex"
import { buildFlexItemSizingStyle, type FlexItemSizing } from "../../fields/flexItemSizing"
import { buildSpacingStyle } from "../../fields/spacing"
import { SLOT_MIN_EMPTY_HEIGHT } from "../../slotEditor"

type ContainerStyleProps = Omit<ContainerProps, "content" | "alignment" | "sizing"> & {
	sizing?: FlexItemSizing
}

export function buildContainerStyle(
	styleProps: ContainerStyleProps,
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

	const style: CSSProperties = {
		...buildSpacingStyle(styleProps),
		...buildBorderStyle(border),
		...buildDimensionStyle(styleProps),
		...buildFlexStyle(styleProps),
		...buildFlexItemSizingStyle(sizing ?? { mode: "fill" }),
		...(hasBackgroundColor(background.color)
			? { backgroundColor: background.color }
			: {}),
		...buildBackgroundImageStyle(background.image),
	}

	if(isEditing) {
		const authorMinHeight = buildDimensionStyle(styleProps).minHeight
		const sizingMode = sizing?.mode ?? "fill"
		if(authorMinHeight !== undefined) {
			style.minHeight = authorMinHeight
		} else if(sizingMode !== "fill") {
			style.minHeight = `${ SLOT_MIN_EMPTY_HEIGHT }px`
		}
	}

	return style
}
