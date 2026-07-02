import { ReactRenderer } from "@tiptap/react"
import { type SuggestionProps as TiptapSuggestionProps } from "@tiptap/suggestion"

import { MentionCombobox } from "./MentionCombobox"

interface MentionSuggestionItem {
	id: string
	label: string
}

export const createMentionSuggestionRender = () => {
	let component: ReactRenderer
	let selectedIndex = 0

	const createSelectItem = (props: TiptapSuggestionProps<MentionSuggestionItem>) => (index: number) => {
		const item = props.items[index]
		if(item) {
			props.command(item)
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if(!component) return

		const target = event.target as Node
		const comboboxElement = component.element
		const editorElement = document.querySelector(".ProseMirror")

		const isOutsideCombobox = !comboboxElement.contains(target)
		const isOutsideEditor = !editorElement?.contains(target)

		if(isOutsideCombobox && isOutsideEditor) {
			cleanup()
		}
	}

	const cleanup = () => {
		if(component) {
			document.removeEventListener("mousedown", handleClickOutside)
			component.element.remove()
			component.destroy()
		}
	}

	const updatePosition = (props: TiptapSuggestionProps<MentionSuggestionItem>) => {
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

	return () => ({
		onStart: (props: TiptapSuggestionProps<MentionSuggestionItem>) => {
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
			document.addEventListener("mousedown", handleClickOutside)
		},

		onUpdate: (props: TiptapSuggestionProps<MentionSuggestionItem>) => {
			if(!component) return

			component.updateProps({
				...props,
				selectedIndex,
				selectItem: createSelectItem(props),
			})
			updatePosition(props)
		},

		onKeyDown(props: { event: KeyboardEvent }) {
			if(props.event.key === "Escape") {
				component.destroy()
				return true
			}

			const currentProps = component.props as TiptapSuggestionProps<MentionSuggestionItem>

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
			cleanup()
		},
	})
}
