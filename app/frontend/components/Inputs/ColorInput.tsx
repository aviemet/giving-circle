import { ColorInput, type ColorInputProps } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import React, { forwardRef } from "react"

import InputWrapper from "./InputWrapper"
import Label from "./Label"

import { type BaseInputProps } from "."

export interface ColorPickerInputProps
	extends
	Omit<BaseInputProps, "disableAutofill">,
	ColorInputProps
{
	label?: React.ReactNode
	value?: string
	initialValue?: string
	id?: string
	onChange?: (color: string) => void
	onFocus?: () => void
	wrapperProps?: Record<string, any>
	children?: React.ReactNode
}

const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>((
	{
		label,
		id,
		name,
		required,
		onChange,
		onFocus,
		value,
		wrapper = true,
		wrapperProps,
		children,
		...props
	},
	ref,
) => {
	const inputId = id || name

	const [currentValue, handleChange] = useUncontrolled<string>({
		value,
		onChange,
	})

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && <Label required={ required } htmlFor={ inputId }>
				{ label }
			</Label> }
			<ColorInput
				ref={ ref }
				id={ inputId }
				name={ name }
				value={ currentValue }
				onChange={ handleChange }
				{ ...props }
			/>
		</InputWrapper>
	)
})

export default ColorPickerInput
