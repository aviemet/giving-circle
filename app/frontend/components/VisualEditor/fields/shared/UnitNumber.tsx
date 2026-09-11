import clsx from "clsx"

import { NumberInput, Select } from "@/components/Inputs"

import * as classes from "./UnitNumber.css"

interface UnitNumberProps {
	name: string
	value: number | undefined
	unit?: string
	units?: readonly string[]
	min?: number
	step?: number
	onChange: (value: number) => void
	onUnitChange?: (unit: string) => void
	className?: string
}

export function UnitNumber({
	name,
	value,
	unit = "px",
	units,
	min = 0,
	step = 1,
	onChange,
	onUnitChange,
	className,
}: UnitNumberProps) {
	const hasUnitChoices = units !== undefined && units.length > 0
	let selectedUnit = unit
	if(hasUnitChoices) {
		const unitIsAllowed = unit.length > 0 && units.some((item) => item === unit)
		if(!unitIsAllowed) {
			selectedUnit = units[0] ?? unit
		}
	}

	const handleAmountChange = (nextValue: string | number) => {
		const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
		onChange(Number.isNaN(numericValue) ? 0 : numericValue)
	}

	if(hasUnitChoices) {
		return (
			<div className={ clsx(classes.unitNumberSplit, className) }>
				<NumberInput
					wrapper={ false }
					name={ `${name}.amount` }
					value={ value ?? 0 }
					min={ min }
					step={ step }
					onChange={ handleAmountChange }
				/>
				<Select
					wrapper={ false }
					name={ `${name}.unit` }
					value={ selectedUnit }
					onChange={ (nextUnit) => {
						if(nextUnit === null || nextUnit.length === 0) {
							return
						}
						onUnitChange?.(nextUnit)
					} }
					options={ units.map((item) => ({ value: item, label: item })) }
				/>
			</div>
		)
	}

	return (
		<div className={ clsx(classes.unitNumber, className) }>
			<NumberInput
				wrapper={ false }
				name={ name }
				value={ value ?? 0 }
				min={ min }
				step={ step }
				onChange={ handleAmountChange }
			/>
			{ unit.length > 0 && (
				<span className={ clsx(classes.unitNumberSuffix) }>{ unit }</span>
			) }
		</div>
	)
}
