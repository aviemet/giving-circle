import { DataAttributes } from "@mantine/core"
import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import { useMemo } from "react"

import { parseContentToStructured } from "@/components/VisualEditor/dynamicData/contentParser"
import { dataAccess, getFlatOptions } from "@/components/VisualEditor/dynamicData/dataAccess"
import { StructuredContent } from "@/components/VisualEditor/dynamicData/types"

import { type BaseInputProps } from "../index"
import { InputWrapper } from "../InputWrapper"
import { Label } from "../Label"
import { useMentionEditor } from "./useMentionEditor"

interface TagsInputProps extends Omit<MantineRichTextEditorProps, "children" | "editor" | "onChange">, BaseInputProps {
	value?: string
	onChange?: (value: string) => void
	onStructuredChange?: (structuredContent: StructuredContent) => void
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
	onStructuredChange,
	readOnly = false,
	className,
	options,
	...props
}: TagsInputProps) {

	const inputId = id || name
	const defaultTagOptions = useMemo(() => getFlatOptions(dataAccess), [])
	const tagOptions = useMemo(() => {
		if(options) {
			return options.map(opt => ({ value: opt, label: opt }))
		}
		return defaultTagOptions
	}, [options, defaultTagOptions])

	const editor = useMentionEditor({
		content: value,
		tagOptions,
		onChange: (htmlContent) => {
			// Convert HTML to structured content
			const structured = parseContentToStructured(htmlContent)
			onStructuredChange?.(structured)
			// Also call the regular onChange for backward compatibility
			onChange?.(htmlContent)
		},
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
