import React, { forwardRef, useState } from 'react'
import { FileInput, type FileInputProps as MantineFileInputProps } from '@mantine/core'
import { type BaseInputProps } from '..'

export interface SingleFileInputProps extends MantineFileInputProps<false>, BaseInputProps {
	clearable?: boolean
}

const SingleFileInputComponent = forwardRef<HTMLButtonElement, SingleFileInputProps>((
	{
		label,
		required = false,
		size = 'md',
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
	const [localValue, setLocalValue] = useState<File | null>(null)

	const handleChange = (payload: File | null) => {
		if(onChange) {
			onChange(payload)
		} else {
			setLocalValue(payload)
		}
	}


	return (
		<FileInput
			ref={ ref }
			multiple={ false }
			value={ localValue }
			onChange={ handleChange }
			required={ required }
			size={ size }
			{ ...props }
		/>
	)
})

export default SingleFileInputComponent
