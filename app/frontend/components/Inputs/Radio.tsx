import { Radio, type RadioProps as MantineRadioProps } from "@mantine/core"
import React, { type Ref } from "react"

import { InputWrapper } from "./InputWrapper"

import { type BaseInputProps } from "."

export interface RadioProps extends Omit<MantineRadioProps, "value">, BaseInputProps {
	ref?: Ref<HTMLInputElement>
	value: string
}

export function RadioComponent({
	id,
	wrapper,
	wrapperProps,
	value,
	ref,
	...props
}: RadioProps) {
	const inputId = id ?? value

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			<Radio
				ref={ ref }
				id={ inputId }
				value={ value }
				{ ...props }
			/>
		</InputWrapper>
	)
}

RadioComponent.Group = Radio.Group
