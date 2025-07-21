import {
	DatePickerInput,
	type DatePickerType,
	type DatePickerInputProps,
	type DatesRangeValue,
	type DateValue,
} from "@mantine/dates"
import dayjs from "dayjs"
import { useEffect, useState, forwardRef } from "react"

import { CalendarIcon } from "@/components/Icons"
import { isUnset, isDate } from "@/lib"


import InputWrapper from "./InputWrapper"
import Label from "./Label"

import { type DateInputValue, type BaseInputProps } from "."

type DateValueByType<T extends DatePickerType = "default"> =
	T extends "multiple" ? DateValue[] :
		T extends "range" ? [DateValue, DateValue] | undefined :
	DateValue | undefined

export interface DateInputProps
	extends
	Omit<DatePickerInputProps, "onChange" | "value">,
	Omit<BaseInputProps, "disableAutofill"> {
	name?: string
	id?: string
	value: DateInputValue
	error?: string | string[]
	onChange?: (date: DateInputValue) => void
}

const DateInputComponent = forwardRef<HTMLButtonElement, DateInputProps>((
	{
		label,
		id,
		name,
		type = "default",
		valueFormat = "L",
		required,
		wrapper,
		wrapperProps,
		value,
		onChange,
		...props
	},
	ref,
) => {
	const inputId = id || name

	const [localValue, setLocalValue] = useState<DateValueByType<typeof type>>(() => {
		if(isUnset(value)) return undefined
		if(isDate(value)) return dayjs(value).format(valueFormat)
		if(Array.isArray(value)) {
			const formattedValues = (value as Array<unknown>).map((v) => {
				if(isDate(v)) return dayjs(v).format(valueFormat)
				if(typeof v === "string") return v
				return ""
			})
			return formattedValues as DatesRangeValue
		}
		return value
	})

	const [datePickerType, setDatePickerType] = useState(type)

	const handleChange = (changeValue: DateInputValue) => {
		setLocalValue(changeValue)
		onChange?.(changeValue)
	}

	useEffect(() => {
		if(datePickerType === type) return

		if(type === "range") {
			if(Array.isArray(localValue)) {
				if(localValue.length !== 2) {
					setLocalValue([localValue[0], ""] as DatesRangeValue)
				}
			} else if(localValue) {
				setLocalValue([localValue, ""] as DatesRangeValue)
			} else {
				setLocalValue(undefined)
			}
		} else {
			setLocalValue(Array.isArray(localValue) ? localValue[0] : undefined)
		}

		setDatePickerType(type)
	}, [type, datePickerType, localValue])

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && <Label required={ required } htmlFor={ inputId }>
				{ label }
			</Label> }
			<DatePickerInput
				ref={ ref }
				id={ inputId }
				name={ name }
				value={ localValue as DateValueByType<typeof datePickerType> }
				type={ datePickerType }
				onChange={ handleChange }
				valueFormat={ valueFormat }
				leftSection={ <CalendarIcon /> }
				leftSectionPointerEvents="none"
				clearable
				{ ...props }
			/>
		</InputWrapper>
	)
})

export default DateInputComponent

