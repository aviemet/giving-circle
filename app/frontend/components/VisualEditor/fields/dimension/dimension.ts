export type DimensionUnit = "px" | "%" | "vh" | "vw" | "rem" | "auto"

export type DimensionInput = {
	amount?: number
	unit: DimensionUnit
}

export type ParsedDimension =
	| { kind: "auto" }
	| { kind: "simple", amount: number, unit: Exclude<DimensionUnit, "auto"> }
	| { kind: "advanced", value: string }

const SIMPLE_DIMENSION_PATTERN = /^([\d.]+)(px|%|vh|vw|rem)$/

export function normalizeDimensionValue(value: string): string {
	if(/^\d+$/.test(value)) {
		return `${value}px`
	}
	return value
}

export function formatDimensionValue(amount: number | undefined, unit: DimensionUnit): string | undefined {
	if(unit === "auto") {
		return "auto"
	}
	if(amount === undefined || Number.isNaN(amount)) {
		return undefined
	}
	return `${amount}${unit}`
}

export function parseDimensionValue(value: string | undefined): ParsedDimension | undefined {
	if(!value || value.trim() === "") {
		return undefined
	}

	const trimmed = value.trim()
	if(trimmed === "auto") {
		return { kind: "auto" }
	}

	const simpleMatch = trimmed.match(SIMPLE_DIMENSION_PATTERN)
	if(simpleMatch) {
		return {
			kind: "simple",
			amount: parseFloat(simpleMatch[1]),
			unit: simpleMatch[2] as Exclude<DimensionUnit, "auto">,
		}
	}

	return { kind: "advanced", value: trimmed }
}

export function dimensionInputToCSSValue(input: DimensionInput | undefined): string | undefined {
	if(!input) {
		return undefined
	}
	return formatDimensionValue(input.amount, input.unit)
}

export function dimensionInputFromParsed(parsed: ParsedDimension | undefined): DimensionInput {
	if(!parsed || parsed.kind === "advanced") {
		return { unit: "px" }
	}
	if(parsed.kind === "auto") {
		return { unit: "auto" }
	}
	return { amount: parsed.amount, unit: parsed.unit }
}
