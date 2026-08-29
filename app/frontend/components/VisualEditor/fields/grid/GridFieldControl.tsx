import { useState } from "react"

import {
	OverflowAutoIcon,
	OverflowHiddenIcon,
	OverflowVisibleIcon,
} from "@/components/Icons"
import { i18n } from "@/lib/i18n"

import {
	isGridAlignItems,
	isGridOverflow,
	normalizeGridLayoutValue,
	type GridLayoutValue,
} from "./grid"
import * as classes from "./gridField.css"
import {
	FieldRow,
	IconSegmented,
	UnitNumber,
} from "../shared"
import {
	GAP_UNITS,
	coerceLength,
	isLengthUnit,
} from "../shared/length"

function gridText(key: string) {
	return i18n.t(`slides.editor.fields.grid.${key}`)
}

const LAST_ROW_START = "start"
const LAST_ROW_CENTER = "center"

interface GridFieldControlProps {
	name: string
	value: GridLayoutValue | undefined
	onChange: (value: GridLayoutValue | undefined) => void
}

export function GridFieldControl({ name, value, onChange }: GridFieldControlProps) {
	const [localValue, setLocalValue] = useState<GridLayoutValue>(() => normalizeGridLayoutValue(value))

	const updateValue = (patch: Partial<GridLayoutValue>) => {
		const next = normalizeGridLayoutValue({
			...localValue,
			...patch,
		})
		setLocalValue(next)
		onChange(next)
	}

	const gap = coerceLength(localValue.gap, GAP_UNITS, "px")

	return (
		<div className={ classes.gridFieldRoot }>
			<FieldRow label={ gridText("labels.columns") }>
				<UnitNumber
					name={ `${name}.columns` }
					value={ localValue.columns }
					unit=""
					min={ 1 }
					onChange={ (columns) => updateValue({ columns }) }
				/>
			</FieldRow>

			<FieldRow label={ gridText("labels.gap") }>
				<UnitNumber
					name={ `${name}.gap` }
					value={ gap.amount }
					unit={ gap.unit }
					units={ GAP_UNITS }
					onChange={ (amount) => updateValue({
						gap: { amount, unit: gap.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, GAP_UNITS)) {
							return
						}
						updateValue({
							gap: { amount: gap.amount, unit },
						})
					} }
				/>
			</FieldRow>

			<FieldRow label={ gridText("labels.align") }>
				<IconSegmented
					name={ `${name}.alignItems` }
					value={ localValue.alignItems }
					options={ [
						{
							value: "stretch",
							label: gridText("align.stretch"),
							tooltip: gridText("align.stretch_hint"),
						},
						{
							value: "start",
							label: gridText("align.start"),
							tooltip: gridText("align.start_hint"),
						},
						{
							value: "center",
							label: gridText("align.center"),
							tooltip: gridText("align.center_hint"),
						},
						{
							value: "end",
							label: gridText("align.end"),
							tooltip: gridText("align.end_hint"),
						},
					] }
					onChange={ (nextValue) => {
						if(isGridAlignItems(nextValue)) {
							updateValue({ alignItems: nextValue })
						}
					} }
				/>
			</FieldRow>

			<FieldRow
				label={ gridText("labels.last_row") }
				tooltip={ gridText("last_row.hint") }
			>
				<IconSegmented
					name={ `${name}.centerLastRow` }
					value={ localValue.centerLastRow ? LAST_ROW_CENTER : LAST_ROW_START }
					options={ [
						{
							value: LAST_ROW_START,
							label: gridText("last_row.start"),
							tooltip: gridText("last_row.start_hint"),
						},
						{
							value: LAST_ROW_CENTER,
							label: gridText("last_row.center"),
							tooltip: gridText("last_row.center_hint"),
						},
					] }
					onChange={ (nextValue) => {
						updateValue({ centerLastRow: nextValue === LAST_ROW_CENTER })
					} }
				/>
			</FieldRow>

			<FieldRow label={ gridText("labels.overflow") }>
				<IconSegmented
					name={ `${name}.overflow` }
					value={ localValue.overflow }
					options={ [
						{
							value: "visible",
							label: <OverflowVisibleIcon />,
							tooltip: `${gridText("overflow.visible")} — ${gridText("overflow.visible_hint")}`,
						},
						{
							value: "auto",
							label: <OverflowAutoIcon />,
							tooltip: `${gridText("overflow.auto")} — ${gridText("overflow.auto_hint")}`,
						},
						{
							value: "hidden",
							label: <OverflowHiddenIcon />,
							tooltip: `${gridText("overflow.hidden")} — ${gridText("overflow.hidden_hint")}`,
						},
					] }
					onChange={ (nextValue) => {
						if(isGridOverflow(nextValue)) {
							updateValue({ overflow: nextValue })
						}
					} }
				/>
			</FieldRow>
		</div>
	)
}
