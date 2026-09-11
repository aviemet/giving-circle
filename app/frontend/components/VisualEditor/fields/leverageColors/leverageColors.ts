import {
	BORDER_RADIUS_UNITS,
	coerceLength,
	type BorderRadiusUnit,
	type LengthValue,
} from "../shared/length"

export type LeverageColorsValue = {
	remainingColor: string
	trackColor: string
	borderRadius: LengthValue<BorderRadiusUnit> | number
}

export const defaultLeverageColors: LeverageColorsValue = {
	remainingColor: "#7CFF2B",
	trackColor: "#1B2A4A",
	borderRadius: { amount: 0, unit: "px" },
}

export function normalizeLeverageColors(
	value: Partial<LeverageColorsValue> | undefined,
): LeverageColorsValue {
	return {
		remainingColor: value?.remainingColor ?? defaultLeverageColors.remainingColor,
		trackColor: value?.trackColor ?? defaultLeverageColors.trackColor,
		borderRadius: coerceLength(
			value?.borderRadius ?? defaultLeverageColors.borderRadius,
			BORDER_RADIUS_UNITS,
			"px",
		),
	}
}
