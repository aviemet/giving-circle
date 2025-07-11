import { FileInput, type FileInputProps as MantineFileInputProps } from "@mantine/core"
import React, { forwardRef } from "react"

const FileInputComponent = forwardRef<HTMLButtonElement, MantineFileInputProps>((
	{
		id,
		name,
		...props
	},
	ref
) => {
	const inputId = id || name

	return (
		<FileInput
			ref={ ref }
			name={ name }
			id={ inputId }
			{ ...props }
		/>
	)
})

export default FileInputComponent
