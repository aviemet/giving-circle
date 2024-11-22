import React, { forwardRef } from 'react'
import {
	RichTextEditor,
	Link,
	type RichTextEditorProps as MantineRichTextEditorProps,
} from '@mantine/tiptap'
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { DEFAULT_LABELS } from './tiptapLabels'

const ColorPickerControl = () => (
	<RichTextEditor.ColorPicker
		colors={ [
			'#25262b',
			'#868e96',
			'#fa5252',
			'#e64980',
			'#be4bdb',
			'#7950f2',
			'#4c6ef5',
			'#228be6',
			'#15aabf',
			'#12b886',
			'#40c057',
			'#82c91e',
			'#fab005',
			'#fd7e14',
		] }
	/>
)

export interface RichTextEditorProps extends Omit<MantineRichTextEditorProps, 'children' | 'editor' | 'onChange'> {
	children?: string
	onChange?: (value: string) => void
}

const RichTextEditorComponent = forwardRef<HTMLDivElement, RichTextEditorProps>((
	{ children, onChange },
	ref
) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextStyle,
			Color,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content: children,
		onUpdate: ({ editor }) => {
			if(onChange) onChange(editor.getHTML())
		},
	})

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
				<>
					<FloatingMenu editor={ editor }>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.BulletList />
						</RichTextEditor.ControlsGroup>
					</FloatingMenu>

					<BubbleMenu editor={ editor }>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Link />
							<ColorPickerControl />
						</RichTextEditor.ControlsGroup>
					</BubbleMenu>
				</>
			) }
			<RichTextEditor.Content />
		</RichTextEditor>
	)
})

export default RichTextEditorComponent
