import clsx from "clsx"

import { NumberInput } from "@/components/Inputs"

import * as classes from "./UnitNumber.css"

interface UnitNumberProps {
	name: string
	value: number | undefined
	unit?: string
	min?: number
	step?: number
	onChange: (value: number) => void
	className?: string
}

export function UnitNumber({
	name,
	value,
	unit = "px",
	min = 0,
	step = 1,
	onChange,
	className,
}: UnitNumberProps) {
	return (
		<div className={ clsx(classes.unitNumber, className) }>
			<NumberInput
				wrapper={ false }
				name={ name }
				value={ value ?? 0 }
				min={ min }
				step={ step }
				onChange={ (nextValue) => {
					const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
					onChange(Number.isNaN(numericValue) ? 0 : numericValue)
				} }
			/>
			{ unit.length > 0 && (
				<span className={ clsx(classes.unitNumberSuffix) }>{ unit }</span>
			) }
		</div>
	)
}
