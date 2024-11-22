import React, { forwardRef, useState } from 'react'
import { FileInput, type FileInputProps as MantineFileInputProps } from '@mantine/core'
import { type BaseInputProps } from '..'
import Label from '../Label'
import InputWrapper from '../InputWrapper'
import SingleFileInputComponent from './Single'
import MultiSelectComponent from '../MultiSelect'

export interface FileInputProps<M extends boolean = false> extends MantineFileInputProps<M>, BaseInputProps  {
	multiple: M
	clearable?: boolean
}

const FileInputComponent = forwardRef<HTMLButtonElement, FileInputProps>((
	{
		id,
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
		multiple = false,
		...props
	},
	ref,
) => {
	const inputId = id || props.name

	// Manage value as a local state to enable clearable feature
	const [localValue, setLocalValue] = useState<File | File[] | null>(null)

	const handleChange = (payload: File | File[] | null) => {
		if(onChange) {
			onChange(payload)
		} else {
			setLocalValue(payload)
		}
	}

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && <Label required={ required } htmlFor={ inputId }>
				{ label }
			</Label> }
			<FileInput
				ref={ ref }
				multiple={ false }
				value={ localValue }
				onChange={ handleChange }
				required={ required }
				size={ size }
				{ ...props }
			/>
		</InputWrapper>
	)
})

export default FileInputComponent
