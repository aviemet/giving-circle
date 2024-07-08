import React, { forwardRef } from 'react'
import { type FileInputProps as MantineFileInputProps } from '@mantine/core'
import { type BaseInputProps } from '..'
import Label from '../Label'
import InputWrapper from '../InputWrapper'
import SingleFileInputComponent from './Single'
import MultiSelectComponent from '../MultiSelect'

export interface FileInputProps extends MantineFileInputProps, BaseInputProps {}

const FileInputComponent = forwardRef<HTMLButtonElement, FileInputProps>((
	{ multiple = false, id, ...props },
	ref,
) => {
	const inputId = id || props.name

	const FileInput = multiple ? MultiSelectComponent : SingleFileInputComponent

	return (
		<InputWrapper wrapper={ props.wrapper } wrapperProps={ props.wrapperProps }>
			{ props.label && <Label required={ props.required } htmlFor={ inputId }>
				{ props.label }
			</Label> }
			<FileInput ref={ ref } id={ inputId } { ...props } />
			{ /* { multiple ?
				<MultiSelectComponent ref={ ref } id={ inputId } { ...props } />
				:
				<SingleFileInputComponent ref={ ref } id={ inputId } { ...props } />
			} */ }
		</InputWrapper>
	)
})

export default FileInputComponent
