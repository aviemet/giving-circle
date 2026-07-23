export type LeverageColorsValue = {
	remainingColor: string
	trackColor: string
	borderRadius: number
}

export function defaultLeverageColors(): LeverageColorsValue {
	return {
		remainingColor: "#7CFF2B",
		trackColor: "#1B2A4A",
		borderRadius: 0,
	}
}

export function normalizeLeverageColors(
	value: Partial<LeverageColorsValue> | undefined,
	legacy?: {
		remainingColor?: string
		trackColor?: string
		borderRadius?: number
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
		borderRadius: value?.borderRadius
			?? legacy?.borderRadius
			?? defaults.borderRadius,
	}
}
