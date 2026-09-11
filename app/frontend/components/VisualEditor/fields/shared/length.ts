export type LengthValue<Unit extends string = string> = {
	amount: number
	unit: Unit
}

export const BORDER_WIDTH_UNITS = ["px", "rem", "em"] as const
export type BorderWidthUnit = (typeof BORDER_WIDTH_UNITS)[number]

export const BORDER_RADIUS_UNITS = ["px", "rem", "em", "%"] as const
export type BorderRadiusUnit = (typeof BORDER_RADIUS_UNITS)[number]

export const GAP_UNITS = ["px", "rem", "em", "%"] as const
export type GapUnit = (typeof GAP_UNITS)[number]

export const SPACING_LENGTH_UNITS = ["px", "rem", "em", "%"] as const
export type SpacingLengthUnit = (typeof SPACING_LENGTH_UNITS)[number]

function resolvedUnit<Unit extends string>(
	candidate: string,
	units: readonly Unit[],
	fallback: Unit,
): Unit {
	const match = units.find((unit) => unit === candidate)
	if(match === undefined) {
		return fallback
	}
	return match
}

export function isLengthUnit<Unit extends string>(
	value: string,
	units: readonly Unit[],
): value is Unit {
	return units.some((unit) => unit === value)
}

export function coerceLength<Unit extends string>(
	value: LengthValue<string> | number,
	units: readonly Unit[],
	fallbackUnit: Unit,
): LengthValue<Unit> {
	if(typeof value === "number") {
		return {
			amount: Number.isFinite(value) ? Math.max(0, value) : 0,
			unit: fallbackUnit,
		}
	}

	const amount = Number.isFinite(value.amount) ? Math.max(0, value.amount) : 0
	return {
		amount,
		unit: resolvedUnit(value.unit, units, fallbackUnit),
	}
}

export function normalizeOptionalLength<Unit extends string>(
	value: LengthValue<string> | number | undefined,
	units: readonly Unit[],
	fallbackUnit: Unit,
): LengthValue<Unit> | undefined {
	if(value === undefined) {
		return undefined
	}
	return coerceLength(value, units, fallbackUnit)
}

export function lengthCss(value: LengthValue): string {
	return `${value.amount}${value.unit}`
}

export function lengthToCss(
	value: LengthValue | number | undefined,
): string | undefined {
	if(value === undefined) {
		return undefined
	}
	if(typeof value === "number") {
		if(!Number.isFinite(value)) {
			return undefined
		}
		return `${value}px`
	}
	if(!Number.isFinite(value.amount)) {
		return undefined
	}
	return lengthCss(value)
}

export function lengthAmount(
	value: LengthValue | number | undefined,
): number | undefined {
	if(value === undefined) {
		return undefined
	}
	if(typeof value === "number") {
		return Number.isFinite(value) ? value : undefined
	}
	return Number.isFinite(value.amount) ? value.amount : undefined
}
