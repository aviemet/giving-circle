import { type CSSProperties } from "react"

import {
	coerceLength,
	lengthCss,
	type LengthValue,
} from "../shared/length"

export const LEVERAGE_BAR_WIDTH_UNITS = ["px", "%", "rem", "vw"] as const
export type LeverageBarWidthUnit = (typeof LEVERAGE_BAR_WIDTH_UNITS)[number]

export const LEVERAGE_BAR_HEIGHT_UNITS = ["px", "rem", "em"] as const
export type LeverageBarHeightUnit = (typeof LEVERAGE_BAR_HEIGHT_UNITS)[number]

export type LeverageBarSizeValue = {
	width: LengthValue<LeverageBarWidthUnit>
	height: LengthValue<LeverageBarHeightUnit>
}

export function defaultLeverageBarSize(): LeverageBarSizeValue {
	return {
		width: { amount: 100, unit: "%" },
		height: { amount: 36, unit: "px" },
	}
}

export function normalizeLeverageBarSize(
	value: Partial<LeverageBarSizeValue> | undefined,
): LeverageBarSizeValue {
	const defaults = defaultLeverageBarSize()

	return {
		width: coerceLength(
			value?.width ?? defaults.width,
			LEVERAGE_BAR_WIDTH_UNITS,
			"%",
		),
		height: coerceLength(
			value?.height ?? defaults.height,
			LEVERAGE_BAR_HEIGHT_UNITS,
			"px",
		),
	}
}

export function buildLeverageBarSizeStyle(
	size: LeverageBarSizeValue | undefined,
): CSSProperties {
	const resolved = normalizeLeverageBarSize(size)
	const width = lengthCss(resolved.width)
	const height = lengthCss(resolved.height)

	return {
		width,
		height,
		maxWidth: "100%",
		flexGrow: 0,
		flexShrink: 0,
		minHeight: height,
	}
}
