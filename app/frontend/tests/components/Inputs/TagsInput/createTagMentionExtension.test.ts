import { Editor } from "@tiptap/core"
import { StarterKit } from "@tiptap/starter-kit"
import { afterEach, describe, expect, test } from "vitest"

import { createTagMentionExtension } from "@/components/Inputs/TagsInput/createTagMentionExtension"
import {
	hydrateRichTextTagMentions,
	serializeRichTextTagMentions,
} from "@/components/VisualEditor/dynamicData/contentParser"

const tagOptions = [
	{ value: "membership.name", label: "Member - name" },
	{ value: "interact_url", label: "Interact URL" },
]

describe("createTagMentionExtension", () => {
	let editor: Editor | null = null

	afterEach(() => {
		editor?.destroy()
		editor = null
	})

	test("hydrated #path becomes an atomic mention that serializes back to #path", () => {
		editor = new Editor({
			extensions: [
				StarterKit,
				createTagMentionExtension(tagOptions),
			],
			content: hydrateRichTextTagMentions(
				"<p>Hi #membership.name</p>",
				tagOptions,
			),
		})

		expect(editor.getHTML()).toContain("data-type=\"mention\"")
		expect(serializeRichTextTagMentions(editor.getHTML())).toBe("<p>Hi #membership.name</p>")
	})

	test("deleting a mention removes the whole token without leaving a partial path", () => {
		editor = new Editor({
			extensions: [
				StarterKit,
				createTagMentionExtension(tagOptions),
			],
			content: hydrateRichTextTagMentions(
				"<p>Hi #membership.name!</p>",
				tagOptions,
			),
		})

		let mentionFrom = 0
		let mentionSize = 0
		editor.state.doc.descendants((node, position) => {
			if(node.type.name === "mention") {
				expect(node.isAtom).toBe(true)
				mentionFrom = position
				mentionSize = node.nodeSize
				return false
			}
			return true
		})

		expect(mentionSize).toBeGreaterThan(0)
		editor.commands.deleteRange({ from: mentionFrom, to: mentionFrom + mentionSize })

		const serialized = serializeRichTextTagMentions(editor.getHTML())
		expect(serialized).not.toContain("#membership")
		expect(serialized).not.toMatch(/#membership\.nam/)
		expect(serialized).toBe("<p>Hi !</p>")
	})

	test("bold mark applies to the mention node as a unit", () => {
		editor = new Editor({
			extensions: [
				StarterKit,
				createTagMentionExtension(tagOptions),
			],
			content: hydrateRichTextTagMentions(
				"<p>#membership.name</p>",
				tagOptions,
			),
		})

		let mentionFrom = 0
		let mentionSize = 0
		editor.state.doc.descendants((node, position) => {
			if(node.type.name === "mention") {
				mentionFrom = position
				mentionSize = node.nodeSize
				return false
			}
			return true
		})

		editor.commands.setTextSelection({ from: mentionFrom, to: mentionFrom + mentionSize })
		editor.commands.setBold()

		const mention = editor.state.doc.nodeAt(mentionFrom)
		expect(mention?.type.name).toBe("mention")
		expect(mention?.marks.some(mark => mark.type.name === "bold")).toBe(true)
	})
})
