import { type CSSProperties } from "react"

import { type DimensionInput } from "../dimension"
import { type FlexItemSizing } from "../flexItemSizing"
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

export type LeverageBarSizeLegacyProps = {
	size?: LeverageBarSizeValue
	sizing?: FlexItemSizing
}

export function defaultLeverageBarSize(): LeverageBarSizeValue {
	return {
		width: { amount: 100, unit: "%" },
		height: { amount: 36, unit: "px" },
	}
}

function lengthFromDimensionInput<Unit extends string>(
	input: DimensionInput | undefined,
	units: readonly Unit[],
	fallback: LengthValue<Unit>,
): LengthValue<Unit> {
	if(input === undefined || input.unit === "auto" || input.amount === undefined) {
		return fallback
	}

	return coerceLength(
		{ amount: input.amount, unit: input.unit },
		units,
		fallback.unit,
	)
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

export function resolveLeverageBarSize(props: LeverageBarSizeLegacyProps): LeverageBarSizeValue {
	if(props.size !== undefined) {
		return normalizeLeverageBarSize(props.size)
	}

	const defaults = defaultLeverageBarSize()

	return normalizeLeverageBarSize({
		width: lengthFromDimensionInput(
			props.sizing?.width,
			LEVERAGE_BAR_WIDTH_UNITS,
			defaults.width,
		),
		height: lengthFromDimensionInput(
			props.sizing?.height,
			LEVERAGE_BAR_HEIGHT_UNITS,
			defaults.height,
		),
	})
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
