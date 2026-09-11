import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import { Color } from "@tiptap/extension-color"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TextAlign } from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { type Editor, useEditor } from "@tiptap/react"
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus"
import { StarterKit } from "@tiptap/starter-kit"
import clsx from "clsx"
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type Ref } from "react"


import { createTagMentionExtension } from "@/components/Inputs/TagsInput/createTagMentionExtension"
import {
	hydrateRichTextTagMentions,
	serializeRichTextTagMentions,
	type TagEditorOption,
} from "@/components/VisualEditor/lib/dynamicData"

import * as classes from "./index.css"
import { DEFAULT_LABELS } from "./tiptapLabels"

const ColorPickerControl = () => (
	<RichTextEditor.ColorPicker
		colors={ [
			"#25262b",
			"#868e96",
			"#fa5252",
			"#e64980",
			"#be4bdb",
			"#7950f2",
			"#4c6ef5",
			"#228be6",
			"#15aabf",
			"#12b886",
			"#40c057",
			"#82c91e",
			"#fab005",
			"#fd7e14",
		] }
	/>
)

export interface RichTextEditorProps extends Omit<MantineRichTextEditorProps, "children" | "editor" | "onChange"> {
	children?: string
	onChange?: (value: string) => void
	onEditorReady?: (editor: Editor | null) => void
	tagOptions?: TagEditorOption[]
}

type RichTextEditorPropsWithRef = RichTextEditorProps & {
	ref?: Ref<HTMLDivElement>
}

function RichTextEditorComponent({
	children,
	onChange,
	onEditorReady,
	tagOptions,
	className,
	ref,
}: RichTextEditorPropsWithRef) {
	const hasTagOptions = tagOptions !== undefined && tagOptions.length > 0
	const tagOptionsKey = hasTagOptions
		? tagOptions.map(option => `${option.value}\u0000${option.label}`).join("\u0001")
		: ""
	const resolvedTagOptions = useMemo(() => {
		if(!hasTagOptions) return []
		return tagOptionsKey.split("\u0001").map(entry => {
			const [value, label] = entry.split("\u0000")
			return { value, label }
		})
	}, [hasTagOptions, tagOptionsKey])

	const [initialContent] = useState(() => {
		const html = children ?? ""
		if(!hasTagOptions) return html
		return hydrateRichTextTagMentions(html, resolvedTagOptions)
	})

	const lastEmittedRef = useRef(
		hasTagOptions ? serializeRichTextTagMentions(children ?? "") : (children ?? ""),
	)
	const isFocusedRef = useRef(false)
	const onChangeRef = useRef(onChange)

	useLayoutEffect(() => {
		onChangeRef.current = onChange
	})

	const extensions = useMemo(() => {
		const base = [
			StarterKit,
			Superscript,
			Subscript,
			Highlight,
			TextStyle,
			Color,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		]

		if(hasTagOptions) {
			return [...base, createTagMentionExtension(resolvedTagOptions)]
		}

		return base
	}, [hasTagOptions, resolvedTagOptions])

	const editor = useEditor({
		extensions,
		content: initialContent,
		onFocus: () => {
			isFocusedRef.current = true
		},
		onBlur: () => {
			isFocusedRef.current = false
		},
		onUpdate: ({ editor: activeEditor }) => {
			const html = activeEditor.getHTML()
			const serialized = hasTagOptions ? serializeRichTextTagMentions(html) : html
			lastEmittedRef.current = serialized
			onChangeRef.current?.(serialized)
		},
	})

	useEffect(() => {
		onEditorReady?.(editor)
	}, [editor, onEditorReady])

	useEffect(() => {
		if(!editor || isFocusedRef.current) return

		const nextValue = children ?? ""
		const serialized = hasTagOptions ? serializeRichTextTagMentions(nextValue) : nextValue
		if(serialized === lastEmittedRef.current) return

		lastEmittedRef.current = serialized
		const content = hasTagOptions
			? hydrateRichTextTagMentions(nextValue, resolvedTagOptions)
			: nextValue
		editor.commands.setContent(content, { emitUpdate: false })
	}, [children, editor, hasTagOptions, resolvedTagOptions])

	return (
		<RichTextEditor
			ref={ ref }
			editor={ editor }
			labels={ DEFAULT_LABELS }
			className={ clsx(classes.richTextEditor, className) }
		>
			<RichTextEditor.Toolbar sticky stickyOffset={ 60 }>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.Code />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>

				<ColorPickerControl />

			</RichTextEditor.Toolbar>

			{ editor && (
				<BubbleMenu editor={ editor }>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Link />
					</RichTextEditor.ControlsGroup>
				</BubbleMenu>
			) }

			{ editor && (
				<FloatingMenu editor={ editor }>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.BulletList />
					</RichTextEditor.ControlsGroup>
				</FloatingMenu>
			) }

			<RichTextEditor.Content />
		</RichTextEditor>
	)
}

export { RichTextEditorComponent as RichTextEditor }
