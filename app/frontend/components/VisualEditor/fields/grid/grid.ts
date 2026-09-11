import { type CSSProperties } from "react"

import {
	GAP_UNITS,
	coerceLength,
	lengthCss,
	type GapUnit,
	type LengthValue,
} from "../shared/length"

export type GridAlignItems = "stretch" | "start" | "center" | "end"
export type GridOverflow = "visible" | "auto" | "hidden"

export type GridLayoutValue = {
	columns: number
	gap: LengthValue<GapUnit> | number
	alignItems: GridAlignItems
	overflow: GridOverflow
	centerLastRow: boolean
}

export const DEFAULT_GRID_COLUMNS = 3
export const DEFAULT_GRID_GAP: LengthValue<GapUnit> = { amount: 16, unit: "px" }

export function defaultGridLayoutValue(): GridLayoutValue {
	return {
		columns: DEFAULT_GRID_COLUMNS,
		gap: DEFAULT_GRID_GAP,
		alignItems: "stretch",
		overflow: "visible",
		centerLastRow: false,
	}
}

function isFiniteNumber(value: number | undefined): value is number {
	return value !== undefined && Number.isFinite(value)
}

export function normalizeGridColumns(value: number | undefined): number {
	if(!isFiniteNumber(value)) {
		return DEFAULT_GRID_COLUMNS
	}

	return Math.max(1, Math.floor(value))
}

export function normalizeGridGap(
	value: LengthValue<string> | number | undefined,
): LengthValue<GapUnit> {
	if(value === undefined) {
		return DEFAULT_GRID_GAP
	}

	return coerceLength(value, GAP_UNITS, DEFAULT_GRID_GAP.unit)
}

export function isGridAlignItems(value: string): value is GridAlignItems {
	return value === "stretch"
		|| value === "start"
		|| value === "center"
		|| value === "end"
}

export function isGridOverflow(value: string): value is GridOverflow {
	return value === "visible" || value === "auto" || value === "hidden"
}

export function normalizeGridLayoutValue(
	value: Partial<GridLayoutValue> | undefined,
): GridLayoutValue {
	const defaults = defaultGridLayoutValue()

	return {
		columns: normalizeGridColumns(value?.columns),
		gap: normalizeGridGap(value?.gap),
		alignItems: value?.alignItems !== undefined && isGridAlignItems(value.alignItems)
			? value.alignItems
			: defaults.alignItems,
		overflow: value?.overflow !== undefined && isGridOverflow(value.overflow)
			? value.overflow
			: defaults.overflow,
		centerLastRow: value?.centerLastRow === true,
	}
}

export function gridItemBasisCss(
	columns: number,
	gap: LengthValue<GapUnit> | number,
): string {
	const columnCount = normalizeGridColumns(columns)
	if(columnCount === 1) {
		return "100%"
	}

	const gapCss = lengthCss(normalizeGridGap(gap))
	return `calc((100% - ${columnCount - 1} * ${gapCss}) / ${columnCount})`
}

function overflowStyle(overflow: GridOverflow): CSSProperties {
	const style: CSSProperties = { overflow }
	if(overflow === "auto" || overflow === "hidden") {
		style.minHeight = 0
	}
	return style
}

export type GridLayoutStyle = CSSProperties & {
	"--grid-cols": number
	"--grid-gap": string
	"--grid-item-basis": string
	"--grid-align-items": GridAlignItems
}

export function buildGridLayoutStyle(layout: GridLayoutValue): GridLayoutStyle {
	const gap = normalizeGridGap(layout.gap)
	const gapCss = lengthCss(gap)

	return {
		"--grid-cols": layout.columns,
		"--grid-gap": gapCss,
		"--grid-item-basis": gridItemBasisCss(layout.columns, gap),
		"--grid-align-items": layout.alignItems,
		gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
		gap: gapCss,
		alignItems: layout.alignItems,
		...overflowStyle(layout.overflow),
	}
}
