import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import { forwardRef, useMemo } from "react"

import { dataAccess, getFlatOptions } from "@/components/VisualEditor/dataAccess"

import { type BaseInputProps } from "../index"
import InputWrapper from "../InputWrapper"
import Label from "../Label"
import useMentionEditor from "./useMentionEditor"

interface TagsInputProps extends Omit<MantineRichTextEditorProps, "children" | "editor" | "onChange">, BaseInputProps {
	value?: string
	onChange?: (value: string) => void
	label?: string
	id?: string
	placeholder?: string
	readOnly?: boolean
	wrapperProps?: any
}

const TagsInput = forwardRef<HTMLDivElement, TagsInputProps>(({
	label,
	required = false,
	id,
	name,
	wrapper,
	wrapperProps,
	value = "",
	onChange,
	readOnly = false,
	...props
}, ref) => {

	const inputId = id || name
	const tagOptions = useMemo(() => getFlatOptions(dataAccess), [])
	const editor = useMentionEditor({
		content: value,
		tagOptions,
		onChange,
	})

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && (
				<Label required={ required } htmlFor={ inputId }>
					{ label }
				</Label>
			) }

			<RichTextEditor
				ref={ ref }
				editor={ editor }
				{ ...props }
			>
				<RichTextEditor.Content />
			</RichTextEditor>
		</InputWrapper>
	)
})

export default TagsInput

