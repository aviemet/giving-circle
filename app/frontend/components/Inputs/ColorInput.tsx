import { ColorInput, type ColorInputProps } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import React, { type Ref } from "react"

import { InputWrapper } from "./InputWrapper"
import { Label } from "./Label"

import { type BaseInputProps } from "."

export interface ColorPickerInputProps
	extends
	Omit<BaseInputProps, "disableAutofill">,
	ColorInputProps
{
	ref?: Ref<HTMLInputElement>
	label?: React.ReactNode
	value?: string
	initialValue?: string
	id?: string
	onChange?: (color: string) => void
	onFocus?: () => void
	wrapperProps?: Record<string, any>
	children?: React.ReactNode
}

export function ColorPickerInput({
	ref,
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
}: ColorPickerInputProps) {
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
}
