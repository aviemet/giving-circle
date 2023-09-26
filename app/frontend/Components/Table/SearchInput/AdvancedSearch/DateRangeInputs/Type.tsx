import React from 'react'
import { Select } from '@/Components/Inputs'
import { type IAdvancedInputProps } from '.'

export const dateRangeOptions = [
	{ label: 'Exact Date', value: 'exact' },
	{ label: 'Before', value: 'before' },
	{ label: 'After', value: 'after' },
	{ label: 'Between', value: 'range' },
] as const

type DateRangeType = typeof dateRangeOptions[number]['value']

const Type = ({
	advancedSearch,
	name,
}: IAdvancedInputProps) => {
	const { inputProps, setInputValue } = advancedSearch

	return (
		<Select
			label="Creation Date"
			{ ...inputProps(`${name}[type]`) }
			onChange={ (value: DateRangeType) => setInputValue(`${name}[type]`, value) }
			options={ dateRangeOptions }
		/>
	)
}

export default React.memo(Type)
