import React from "react"

import { useFormField } from "@/components/Form"
import { type TagEditorOption } from "@/components/VisualEditor/dynamicData/contentParser"

import { RichTextEditor, type RichTextEditorProps } from "../RichTextEditor"
import { HiddenInput } from "./HiddenInput"
import { InputWrapper } from "./InputWrapper"
import { Label } from "./Label"

import { type BaseInputProps } from "."

export interface RichTextInputProps
	extends
	Omit<RichTextEditorProps, "children" | "onChange">,
	Omit<BaseInputProps, "disableAutofill"> {
	ref?: React.Ref<HTMLDivElement>
	label?: React.ReactNode
	required?: boolean
	id?: string
	name: string
	tagOptions?: TagEditorOption[]
	onChange?: (value: string) => void
}

export function RichText({
	label,
	name,
	required = false,
	id,
	onChange,
	wrapper,
	ref,
	tagOptions,
	...props
}: RichTextInputProps) {
	const inputId = id || name
	const [fieldValue, setFieldValue] = useFormField(name)
	const value = typeof fieldValue === "string" ? fieldValue : ""

	const handleChange = (next: string) => {
		setFieldValue(next)
		onChange?.(next)
	}

	return (
		<InputWrapper wrapper={ wrapper }>
			{ label && <Label required={ required } htmlFor={ inputId }>
				{ label }
			</Label> }
			<HiddenInput name={ name } value={ value } id={ inputId } />
			<RichTextEditor
				ref={ ref }
				id={ inputId }
				tagOptions={ tagOptions }
				onChange={ handleChange }
				{ ...props }
			>
				{ value }
			</RichTextEditor>
		</InputWrapper>
	)
}
