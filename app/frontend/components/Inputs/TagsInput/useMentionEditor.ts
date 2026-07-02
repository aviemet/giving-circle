import Document from "@tiptap/extension-document"
import { Mention } from "@tiptap/extension-mention"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { UndoRedo } from "@tiptap/extensions"
import { useEditor, type Editor } from "@tiptap/react"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import {
	normalizeTagsFieldValue,
	parseContentToStructured,
	serializedTagsToEditorContent,
	structuredContentToEditorContent,
	type TagEditorOption,
} from "@/components/VisualEditor/dynamicData/contentParser"

import { createMentionSuggestionRender } from "./mentionSuggestionRender"

type UseMentionEditor = (args: {
	value: string
	tagOptions: TagEditorOption[]
	onChange?: (value: string) => void
}) => Editor | null

const useMentionEditor: UseMentionEditor = ({ value, tagOptions, onChange }) => {
	const [initialEditorContent] = useState(() =>
		serializedTagsToEditorContent(value, tagOptions),
	)
	const lastEmittedRef = useRef(normalizeTagsFieldValue(value))
	const isFocusedRef = useRef(false)
	const onChangeRef = useRef(onChange)

	useLayoutEffect(() => {
		onChangeRef.current = onChange
	})

	const extensions = useMemo(() => [
		Document,
		Text,
		UndoRedo,
		Paragraph.extend({
			renderHTML({ HTMLAttributes }) {
				return ["span", HTMLAttributes, 0]
			},
		}),
		Mention.configure({
			HTMLAttributes: {
				class: "mention",
			},
			renderText({ options, node }) {
				return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
			},
			suggestion: {
				char: "#",
				items: ({ query }) => {
					return tagOptions.filter(option =>
						option.value.toLowerCase().includes(query.toLowerCase())
					).slice(0, 10).map(option => ({
						id: option.value,
						label: option.label,
					}))
				},
				render: createMentionSuggestionRender(),
			},
		}),
	], [tagOptions])

	const editor = useEditor({
		extensions,
		content: initialEditorContent,
		shouldRerenderOnTransaction: false,
		onFocus: () => {
			isFocusedRef.current = true
		},
		onBlur: () => {
			isFocusedRef.current = false
		},
		onUpdate: ({ editor: activeEditor }) => {
			const serialized = normalizeTagsFieldValue(activeEditor.getHTML())
			lastEmittedRef.current = serialized
			onChangeRef.current?.(serialized)
		},
	})

	useEffect(() => {
		if(!editor || isFocusedRef.current) return

		const valueSerialized = normalizeTagsFieldValue(value)
		if(valueSerialized === lastEmittedRef.current) return

		lastEmittedRef.current = valueSerialized
		editor.commands.setContent(
			structuredContentToEditorContent(parseContentToStructured(value), tagOptions),
			{ emitUpdate: false },
		)
	}, [editor, value, tagOptions])

	return editor
}

export { useMentionEditor }
