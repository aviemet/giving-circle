import { Mention } from "@tiptap/extension-mention"

import { type TagEditorOption } from "@/components/VisualEditor/dynamicData/contentParser"

import { createMentionSuggestionRender } from "./mentionSuggestionRender"

export function createTagMentionExtension(tagOptions: TagEditorOption[]) {
	return Mention.extend({
		marks: "_",
		selectable: true,
	}).configure({
		HTMLAttributes: {
			class: "mention",
		},
		renderText({ options, node }) {
			return `${options.suggestion.char}${node.attrs.id}`
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
	})
}
