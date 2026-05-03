import { FileInput, type FileInputProps as MantineFileInputProps } from "@mantine/core"
import React, { type Ref } from "react"

type MantineFileInputPropsWithRef = MantineFileInputProps & {
	ref?: Ref<HTMLButtonElement>
}

export function FileInputComponent({
	id,
	name,
	ref,
	...props
}: MantineFileInputPropsWithRef) {
	const inputId = id || name

	return (
		<FileInput
			ref={ ref }
			name={ name }
			id={ inputId }
			{ ...props }
		/>
	)
}
