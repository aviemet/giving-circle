import { type CSSProperties } from "react"

import {
	BORDER_RADIUS_UNITS,
	BORDER_WIDTH_UNITS,
	lengthAmount,
	lengthToCss,
	normalizeOptionalLength,
	type BorderRadiusUnit,
	type BorderWidthUnit,
	type LengthValue,
} from "../shared/length"

export type BorderProps = {
	borderWidth?: LengthValue<BorderWidthUnit> | number
	borderRadius?: LengthValue<BorderRadiusUnit> | number
	borderColor?: string
}

export function buildBorderStyle(props: BorderProps): CSSProperties {
	const borderWidth = lengthToCss(normalizeOptionalLength(
		props.borderWidth,
		BORDER_WIDTH_UNITS,
		"px",
	))
	const borderRadius = lengthToCss(normalizeOptionalLength(
		props.borderRadius,
		BORDER_RADIUS_UNITS,
		"px",
	))
	const widthAmount = lengthAmount(props.borderWidth)

	const style: CSSProperties = {
		...(borderWidth !== undefined ? { borderWidth } : {}),
		...(borderRadius !== undefined ? { borderRadius } : {}),
		...(props.borderColor ? { borderColor: props.borderColor } : {}),
	}

	if(widthAmount !== undefined && widthAmount > 0) {
		style.borderStyle = "solid"
	}

	return style
}
