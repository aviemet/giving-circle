import { DataAttributes } from "@mantine/core"
import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import clsx from "clsx"
import { useMemo } from "react"

import { useFormField } from "@/components/Form"
import { tagOptions, type TagEditorOption } from "@/components/VisualEditor/lib/dynamicData"

import { HiddenInput } from "../HiddenInput"
import { type BaseInputProps } from "../index"
import { InputWrapper } from "../InputWrapper"
import { Label } from "../Label"
import * as classes from "./index.css"
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
	options?: Array<string | TagEditorOption>
}

function useTagOptions(options: TagsInputProps["options"]) {
	const hasCustomOptions = options !== undefined
	const optionsKey = hasCustomOptions
		? options.map(option => (
			typeof option === "string" ? option : `${option.value}\u0000${option.label}`
		)).join("\u0001")
		: undefined

	const defaultTagOptions = tagOptions
	return useMemo(() => {
		if(hasCustomOptions) {
			const values = optionsKey ? optionsKey.split("\u0001") : []
			return values.map(entry => {
				if(entry.includes("\u0000")) {
					const [value, label] = entry.split("\u0000")
					return { value, label }
				}
				return { value: entry, label: entry }
			})
		}
		return defaultTagOptions
	}, [defaultTagOptions, hasCustomOptions, optionsKey])
}

export function TagsInput({
	label,
	required = false,
	id,
	name,
	wrapper,
	wrapperProps,
	value: valueProp,
	onChange,
	readOnly = false,
	className,
	options,
	...props
}: TagsInputProps) {
	const [fieldValue, setFieldValue] = useFormField(name)
	const inputId = id || name
	const resolvedOptions = useTagOptions(options)
	const value = valueProp !== undefined
		? valueProp
		: (typeof fieldValue === "string" ? fieldValue : "")

	const handleChange = (next: string) => {
		setFieldValue(next)
		onChange?.(next)
	}

	const editor = useMentionEditor({
		value,
		tagOptions: resolvedOptions,
		onChange: readOnly ? undefined : handleChange,
	})

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && (
				<Label required={ required } htmlFor={ inputId }>
					{ label }
				</Label>
			) }
			<HiddenInput name={ name } value={ value } id={ inputId } />
			<RichTextEditor
				editor={ editor }
				className={ clsx(classes.tagsInput, className) }
				{ ...props }
			>
				<RichTextEditor.Content />
			</RichTextEditor>
		</InputWrapper>
	)
}
