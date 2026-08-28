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

export function defaultLeverageColors(): LeverageColorsValue {
	return {
		remainingColor: "#7CFF2B",
		trackColor: "#1B2A4A",
		borderRadius: { amount: 0, unit: "px" },
	}
}

export function normalizeLeverageColors(
	value: Partial<LeverageColorsValue> | undefined,
	legacy?: {
		remainingColor?: string
		trackColor?: string
		borderRadius?: LengthValue<BorderRadiusUnit> | number
	},
): LeverageColorsValue {
	const defaults = defaultLeverageColors()

	return {
		remainingColor: value?.remainingColor
			?? legacy?.remainingColor
			?? defaults.remainingColor,
		trackColor: value?.trackColor
			?? legacy?.trackColor
			?? defaults.trackColor,
		borderRadius: coerceLength(
			value?.borderRadius ?? legacy?.borderRadius ?? defaults.borderRadius,
			BORDER_RADIUS_UNITS,
			"px",
		),
	}
}
