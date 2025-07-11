import { TextInput, type TextInputProps as MantineTextInputProps } from "@mantine/core"
import React, { forwardRef, useState } from "react"

import { isUnset } from "@/lib"

import InputWrapper from "./InputWrapper"
import Label from "./Label"
import { CrossIcon } from "../Icons"

import { type BaseInputProps } from "."
import { withInjectedProps } from "./index"

export interface TextInputProps extends MantineTextInputProps, BaseInputProps {
	clearable?: boolean
}

const TextInputComponent = forwardRef<HTMLInputElement, TextInputProps>((
	{
		name,
		label,
		required = false,
		id,
		size = "md",
		wrapper,
		wrapperProps,
		clearable = false,
		value,
		onChange,
		readOnly,
		disableAutofill = false,
		...props
	},
	ref,
) => {
	// Manage value as a local state to enable clearable feature
	const [localValue, setLocalValue] = useState(value || "")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(onChange) {
			onChange(e)
		} else {
			setLocalValue(e.target.value)
		}
	}

	const handleClear = () => {
		const fakeEvent = {
			target: {
				value: "",
			},
		} as React.ChangeEvent<HTMLInputElement>
		handleChange(fakeEvent)
	}

	const inputId = id || name

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && <Label required={ required } htmlFor={ inputId }>
				{ label }
			</Label> }
			<TextInput
				ref={ ref }
				name={ name }
				id={ inputId }
				value={ value || localValue }
				onChange={ handleChange }
				required={ required }
				size={ size }
				rightSection={
					!readOnly &&
					clearable &&
					!isUnset(value) &&
					<CrossIcon onClick={ handleClear } />
				}
				{ ...withInjectedProps(props, {
					disableAutofill,
				}) }
			/>
		</InputWrapper>
	)
})

export default TextInputComponent
