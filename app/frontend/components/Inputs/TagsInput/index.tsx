import { DataAttributes } from "@mantine/core"
import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import { useMemo } from "react"

import { dataAccess, getFlatOptions } from "@/components/VisualEditor/dynamicData/dataAccess"

import { type BaseInputProps } from "../index"
import { InputWrapper } from "../InputWrapper"
import { Label } from "../Label"
import { useMentionEditor } from "./useMentionEditor"

interface TagsInputProps extends Omit<MantineRichTextEditorProps, "children" | "editor" | "onChange">, BaseInputProps {
	value?: string
	onChange?: (value: string) => void
	label?: string
	id?: string
	placeholder?: string
	readOnly?: boolean
	wrapperProps?: React.ComponentPropsWithoutRef<"div"> & DataAttributes
	className?: string
	options?: string[]
}

export function TagsInput({
	label,
	required = false,
	id,
	name,
	wrapper,
	wrapperProps,
	value = "",
	onChange,
	readOnly = false,
	className,
	options,
	...props
}: TagsInputProps) {

	const inputId = id || name
	const defaultTagOptions = useMemo(() => getFlatOptions(dataAccess), [])
	const hasCustomOptions = options !== undefined
	const optionsKey = hasCustomOptions ? options.join("\u0000") : undefined

	const tagOptions = useMemo(() => {
		if(hasCustomOptions) {
			const values = optionsKey ? optionsKey.split("\u0000") : []
			return values.map(opt => ({ value: opt, label: opt }))
		}
		return defaultTagOptions
	}, [defaultTagOptions, hasCustomOptions, optionsKey])

	const editor = useMentionEditor({
		value,
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
				editor={ editor }
				className={ className }
				{ ...props }
			>
				<RichTextEditor.Content />
			</RichTextEditor>
		</InputWrapper>
	)
}
