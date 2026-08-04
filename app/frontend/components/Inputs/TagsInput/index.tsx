import { DataAttributes } from "@mantine/core"
import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import clsx from "clsx"
import { useMemo } from "react"

import { useFormField, useFormFieldContext } from "@/components/Form"
import { type TagEditorOption } from "@/components/VisualEditor/dynamicData/contentParser"
import { dataAccess, getFlatOptions } from "@/components/VisualEditor/dynamicData/dataAccess"

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

	const defaultTagOptions = useMemo(() => getFlatOptions(dataAccess), [])
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

function TagsInputEditor({
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
	bound,
	...props
}: TagsInputProps & { bound: boolean }) {
	const inputId = id || name
	const tagOptions = useTagOptions(options)
	const editor = useMentionEditor({
		value,
		tagOptions,
		onChange: readOnly ? undefined : onChange,
	})

	return (
		<InputWrapper wrapper={ wrapper } wrapperProps={ wrapperProps }>
			{ label && (
				<Label required={ required } htmlFor={ inputId }>
					{ label }
				</Label>
			) }
			{ bound && name !== undefined && (
				<HiddenInput name={ name } value={ value } id={ inputId } />
			) }
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

function TagsInputFormField(props: TagsInputProps & { name: string }) {
	const [fieldValue, setFieldValue] = useFormField(props.name)
	const value = typeof fieldValue === "string" ? fieldValue : ""

	return (
		<TagsInputEditor
			{ ...props }
			bound
			value={ value }
			onChange={ (next: string) => {
				setFieldValue(next)
				props.onChange?.(next)
			} }
		/>
	)
}

export function TagsInput(props: TagsInputProps) {
	const formContext = useFormFieldContext(false)
	if(props.name !== undefined && props.name.length > 0 && formContext !== null) {
		return <TagsInputFormField { ...props } name={ props.name } />
	}

	return <TagsInputEditor { ...props } bound={ false } />
}
