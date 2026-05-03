import {
	RichTextEditor,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from "@mantine/tiptap"
import { Color } from "@tiptap/extension-color"
import { Highlight } from "@tiptap/extension-highlight"
import { Link } from "@tiptap/extension-link"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TextAlign } from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { Underline } from "@tiptap/extension-underline"
import { type Editor, useEditor } from "@tiptap/react"
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus"
import { StarterKit } from "@tiptap/starter-kit"
import { useEffect, type Ref } from "react"

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
}

type RichTextEditorPropsWithRef = RichTextEditorProps & {
	ref?: Ref<HTMLDivElement>
}

function RichTextEditorComponent({ children, onChange, onEditorReady, ref }: RichTextEditorPropsWithRef) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			Subscript,
			Highlight,
			TextStyle,
			Color,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: children,
		onUpdate: ({ editor }) => {
			if(onChange) onChange(editor.getHTML())
		},
	})

	useEffect(() => {
		onEditorReady?.(editor)
	}, [editor, onEditorReady])

	return (
		<RichTextEditor
			ref={ ref }
			editor={ editor }
			labels={ DEFAULT_LABELS }
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
