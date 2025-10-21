import { DataAttributes } from "@mantine/core"
import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import clsx from "clsx"
import { forwardRef, useMemo } from "react"

import { parseContentToStructured } from "@/components/VisualEditor/dynamicData/contentParser"
import { dataAccess, getFlatOptions } from "@/components/VisualEditor/dynamicData/dataAccess"
import { StructuredContent } from "@/components/VisualEditor/dynamicData/types"

import { type BaseInputProps } from "../index"
import InputWrapper from "../InputWrapper"
import Label from "../Label"
import * as classes from "./TagsInput.css"
import useMentionEditor from "./useMentionEditor"


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

const TagsInput = forwardRef<HTMLDivElement, TagsInputProps>(({
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
}, ref) => {

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
				ref={ ref }
				editor={ editor }
				className={ clsx(classes.puckMentionBadge, className) }
				{ ...props }
			>
				<RichTextEditor.Content />
			</RichTextEditor>
		</InputWrapper>
	)
})

export default TagsInput

