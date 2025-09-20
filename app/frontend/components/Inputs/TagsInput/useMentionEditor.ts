import Document from "@tiptap/extension-document"
import { Mention } from "@tiptap/extension-mention"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { UndoRedo } from "@tiptap/extensions"
import { ReactRenderer, useEditor, type Editor } from "@tiptap/react"
import { type SuggestionProps as TiptapSuggestionProps } from "@tiptap/suggestion"

import MentionCombobox from "./MentionCombobox"

interface TagOption {
	label: string
	value: string
}

type UseMentionEditor = (args: {
	content: string
	tagOptions: TagOption[]
	onChange?: (value: string) => void
}) => Editor | null

const useMentionEditor: UseMentionEditor = ({ content, tagOptions, onChange }) => {
	return useEditor({
		extensions: [
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
				suggestion: {
					char: "#",
					items: ({ query }) => {
						return tagOptions.filter(option =>
							option.label.toLowerCase().includes(query.toLowerCase())
						).slice(0, 10)
					},

					render: () => {
						let component: ReactRenderer
						let selectedIndex = 0

						const createSelectItem = (props: TiptapSuggestionProps<TagOption>) => (index: number) => {
							const item = props.items[index]
							if(item) {
								props.command(item)
							}
						}

						return {
							onStart: props => {
								component = new ReactRenderer(MentionCombobox, {
									props: {
										...props,
										selectedIndex,
										selectItem: createSelectItem(props),
									},
									editor: props.editor,
								})

								if(!props.clientRect) {
									return
								}

								updatePosition(props)
								document.body.appendChild(component.element)
							},

							onUpdate: props => {
								if(!component) return

								component.updateProps({
									...props,
									selectedIndex,
									selectItem: createSelectItem(props),
								})
								updatePosition(props)
							},

							onKeyDown(props) {
								if(props.event.key === "Escape") {
									component.destroy()
									return true
								}

								// Get current props from component
								const currentProps = component.props as TiptapSuggestionProps<TagOption>

								if(props.event.key === "ArrowDown") {
									selectedIndex = Math.min(selectedIndex + 1, currentProps.items.length - 1)
									component.updateProps({
										...currentProps,
										selectedIndex,
										selectItem: createSelectItem(currentProps),
									})
									return true
								}

								if(props.event.key === "ArrowUp") {
									selectedIndex = Math.max(selectedIndex - 1, 0)
									component.updateProps({
										...currentProps,
										selectedIndex,
										selectItem: createSelectItem(currentProps),
									})
									return true
								}

								if(props.event.key === "Enter") {
									const item = currentProps.items[selectedIndex]
									if(item) {
										currentProps.command(item)
									}
									return true
								}

								return false
							},

							onExit() {
								if(component) {
									component.element.remove()
									component.destroy()
								}
							},
						}

						function updatePosition(props: TiptapSuggestionProps<TagOption>) {
							if(!component || !props.clientRect) return

							const coords = props.clientRect()
							if(coords) {
								const element = component.element as HTMLElement
								element.style.position = "absolute"
								element.style.top = `${coords.bottom + window.scrollY}px`
								element.style.left = `${coords.left + window.scrollX}px`
								element.style.zIndex = "1000"
							}
						}
					},
				},
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange?.(html)
		},
	})
}

export default useMentionEditor
