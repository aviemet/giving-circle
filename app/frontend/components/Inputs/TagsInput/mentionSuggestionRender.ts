import { ReactRenderer } from "@tiptap/react"
import { type SuggestionProps as TiptapSuggestionProps } from "@tiptap/suggestion"

import { MentionCombobox } from "./MentionCombobox"

interface MentionSuggestionItem {
	id: string
	label: string
}

interface MentionComboboxRenderProps {
	items: MentionSuggestionItem[]
	selectedIndex: number
	selectItem: (index: number) => void
	clientRect: () => DOMRect | null
}

export const createMentionSuggestionRender = () => {
	let component: ReactRenderer<unknown, MentionComboboxRenderProps>
	let selectedIndex = 0
	let latestProps: TiptapSuggestionProps<MentionSuggestionItem> | undefined

	const createSelectItem = (props: TiptapSuggestionProps<MentionSuggestionItem>) => (index: number) => {
		const item = props.items[index]
		if(item) {
			props.command(item)
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if(!component) return

		const target = event.target
		if(!(target instanceof Node)) return

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
			const element = component.element
			element.style.position = "absolute"
			element.style.top = `${coords.bottom + window.scrollY}px`
			element.style.left = `${coords.left + window.scrollX}px`
			element.style.zIndex = "1000"
		}
	}

	return () => ({
		onStart: (props: TiptapSuggestionProps<MentionSuggestionItem>) => {
			latestProps = props
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

			latestProps = props
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

			if(latestProps === undefined) {
				return false
			}

			const currentProps = latestProps

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
