import { type CSSProperties } from "react"

import { buildBorderStyle } from "../../fields/border"
import { buildDimensionStyle } from "../../fields/dimension"
import { buildFlexStyle } from "../../fields/flex"
import { buildFlexItemSizingStyle, type FlexItemSizing } from "../../fields/flexItemSizing"
import { buildSpacingStyle } from "../../fields/spacing"
import { SLOT_MIN_EMPTY_HEIGHT } from "../../slotEditor"
import { type ContainerProps } from "./containerConfig"

type ContainerStyleProps = Omit<ContainerProps, "content" | "alignment" | "sizing"> & {
	sizing?: FlexItemSizing
}

export function buildContainerStyle(
	styleProps: ContainerStyleProps,
	sizing: FlexItemSizing | undefined,
	isEditing: boolean,
): CSSProperties {
	const style: CSSProperties = {
		...buildSpacingStyle(styleProps),
		...buildBorderStyle(styleProps),
		...buildDimensionStyle(styleProps),
		...buildFlexStyle(styleProps),
		...buildFlexItemSizingStyle(sizing ?? { mode: "fill" }),
		...(styleProps.backgroundColor ? { backgroundColor: styleProps.backgroundColor } : {}),
	}

	if(isEditing) {
		const authorMinHeight = buildDimensionStyle(styleProps).minHeight
		style.minHeight = authorMinHeight ?? `${ SLOT_MIN_EMPTY_HEIGHT }px`
	}

	return style
}
