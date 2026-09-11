import { type Field } from "@puckeditor/core"
import clsx from "clsx"
import { useState } from "react"

import { i18n } from "@/lib/i18n"

import {
	defaultLeverageBarSize,
	LEVERAGE_BAR_HEIGHT_UNITS,
	LEVERAGE_BAR_WIDTH_UNITS,
	normalizeLeverageBarSize,
	type LeverageBarSizeValue,
} from "./leverageBarSize"
import * as classes from "./leverageBarSizeField.css"
import { FieldRow, PuckFieldLabel, UnitNumber } from "../shared"
import { isLengthUnit } from "../shared/length"

function sizeText(key: string) {
	return i18n.t(`slides.editor.fields.leverage_bar_size.${key}`)
}

interface LeverageBarSizeFieldControlProps {
	name: string
	value: LeverageBarSizeValue | undefined
	onChange: (value: LeverageBarSizeValue) => void
}

function LeverageBarSizeFieldControl({
	name,
	value,
	onChange,
}: LeverageBarSizeFieldControlProps) {
	const [localValue, setLocalValue] = useState<LeverageBarSizeValue>(
		() => normalizeLeverageBarSize(value),
	)

	const updateValue = (patch: Partial<LeverageBarSizeValue>) => {
		const next = normalizeLeverageBarSize({
			...localValue,
			...patch,
		})
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ clsx(classes.sizeRoot) }>
			<FieldRow label={ sizeText("labels.width") }>
				<UnitNumber
					name={ `${name}.width` }
					value={ localValue.width.amount }
					unit={ localValue.width.unit }
					units={ LEVERAGE_BAR_WIDTH_UNITS }
					onChange={ (amount) => updateValue({
						width: { amount, unit: localValue.width.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, LEVERAGE_BAR_WIDTH_UNITS)) {
							return
						}
						updateValue({
							width: { amount: localValue.width.amount, unit },
						})
					} }
				/>
			</FieldRow>
			<FieldRow label={ sizeText("labels.height") }>
				<UnitNumber
					name={ `${name}.height` }
					value={ localValue.height.amount }
					unit={ localValue.height.unit }
					units={ LEVERAGE_BAR_HEIGHT_UNITS }
					onChange={ (amount) => updateValue({
						height: { amount, unit: localValue.height.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, LEVERAGE_BAR_HEIGHT_UNITS)) {
							return
						}
						updateValue({
							height: { amount: localValue.height.amount, unit },
						})
					} }
				/>
			</FieldRow>
		</div>
	)
}

function leverageBarSizeField(): Field<LeverageBarSizeValue | undefined> {
	const label = sizeText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<LeverageBarSizeFieldControl
						name={ name }
						value={ value ?? defaultLeverageBarSize() }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { leverageBarSizeField }
