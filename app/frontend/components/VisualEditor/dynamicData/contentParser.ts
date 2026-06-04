import { type JSONContent } from "@tiptap/core"

import { ContentBlock, StructuredContent, TagMention, TextContent } from "./types"

export interface TagEditorOption {
	value: string
	label: string
}

const TAG_TOKEN = /#([^#\s]+)/g

/** TipTap mention markup is not uniform; we still need to spot chips in saved HTML. */
const isMentionElement = (element: Element): boolean => (
	element.getAttribute("data-type") === "mention" || element.classList.contains("mention")
)

/** Stored paths use data ids, not the human-readable label TipTap may show in the span. */
const tagPathFromMentionElement = (element: Element): string => {
	const dataId = element.getAttribute("data-id")
	if(dataId) return dataId
	return (element.textContent ?? "").trim().replace(/^#/, "")
}

/** Satisfies the structured block shape used elsewhere in the editor pipeline. */
const textBlock = (content: string): TextContent => ({
	type: "text",
	content,
})

/** Satisfies the structured block shape used elsewhere in the editor pipeline. */
const mentionBlock = (tagPath: string): TagMention => ({
	type: "mention",
	tagPath,
})

/** Puck persists plain strings with #path tokens; that is our canonical on-disk format. */
const blocksFromTagTokens = (text: string): ContentBlock[] => {
	const blocks: ContentBlock[] = []
	let cursor = 0

	for(const match of text.matchAll(TAG_TOKEN)) {
		const index = match.index ?? 0
		if(index > cursor) {
			blocks.push(textBlock(text.slice(cursor, index)))
		}
		blocks.push(mentionBlock(match[1]))
		cursor = index + match[0].length
	}

	if(cursor < text.length) {
		blocks.push(textBlock(text.slice(cursor)))
	}

	return blocks
}

/** Walk editor HTML in document order so mentions stay aligned with surrounding copy. */
const walkDomNodes = (node: Node, blocks: ContentBlock[], textBuffer: string[]): void => {
	if(node.nodeType === Node.TEXT_NODE) {
		const text = node.textContent ?? ""
		if(text.length > 0) textBuffer.push(text)
		return
	}

	if(node.nodeType !== Node.ELEMENT_NODE) return

	const element = node as Element
	if(isMentionElement(element)) {
		if(textBuffer.length > 0) {
			const combined = textBuffer.join("")
			textBuffer.length = 0
			blocks.push(...blocksFromTagTokens(combined))
		}
		const tagPath = tagPathFromMentionElement(element)
		if(tagPath.length > 0) {
			blocks.push(mentionBlock(tagPath))
		}
		return
	}

	for(const child of element.childNodes) {
		walkDomNodes(child, blocks, textBuffer)
	}
}

/** TipTap hands us HTML; we need blocks before we can serialize or hydrate the field editor. */
const parseHtmlToBlocks = (html: string): ContentBlock[] => {
	const document = new DOMParser().parseFromString(html, "text/html")
	const blocks: ContentBlock[] = []
	const textBuffer: string[] = []

	for(const child of document.body.childNodes) {
		walkDomNodes(child, blocks, textBuffer)
	}

	if(textBuffer.length > 0) {
		blocks.push(...blocksFromTagTokens(textBuffer.join("")))
	}

	return blocks
}

/** Shared interpreter for field strings in the editor UI and live presentation preview. */
export const parseContentToStructured = (content: string): StructuredContent => {
	if(!content) {
		return { blocks: [] }
	}

	const blocks = content.includes("<")
		? parseHtmlToBlocks(content)
		: blocksFromTagTokens(content)

	return { blocks }
}

/** Puck field values are plain text with embedded #paths, not structured JSON. */
export const serializeStructuredContent = (structured: StructuredContent): string => {
	return structured.blocks.map(block => {
		if(block.type === "mention") {
			return `#${block.tagPath}`
		}
		return block.content
	}).join("")
}

/** Collapse TipTap HTML or other legacy shapes into the single string format puck stores. */
export const normalizeTagsFieldValue = (value: string): string => {
	if(!value) return ""
	return serializeStructuredContent(parseContentToStructured(value))
}

/** TipTap only renders dynamic data as chips when the doc contains mention nodes. */
export const structuredContentToEditorContent = (
	structured: StructuredContent,
	tagOptions?: TagEditorOption[],
): JSONContent => {
	const inlineContent: JSONContent[] = []

	for(const block of structured.blocks) {
		if(block.type === "mention") {
			const option = tagOptions?.find(tagOption => tagOption.value === block.tagPath)
			inlineContent.push({
				type: "mention",
				attrs: {
					id: block.tagPath,
					label: option?.label ?? block.tagPath,
					mentionSuggestionChar: "#",
				},
			})
		} else if(block.content.length > 0) {
			inlineContent.push({ type: "text", text: block.content })
		}
	}

	return {
		type: "doc",
		content: [{ type: "paragraph", content: inlineContent.length > 0 ? inlineContent : undefined }],
	}
}

/** Entry point for showing a puck-saved value as mention chips in the tags field editor. */
export const serializedTagsToEditorContent = (
	value: string,
	tagOptions?: TagEditorOption[],
): JSONContent => {
	return structuredContentToEditorContent(parseContentToStructured(value), tagOptions)
}

/** Preview and public views need resolved data values, not raw template hashtags. */
export const renderStructuredContent = (structured: StructuredContent, evaluateTag: (tagPath: string) => string): string => {
	return structured.blocks.map(block => {
		if(block.type === "mention") {
			return evaluateTag(block.tagPath)
		}
		return block.content
	}).join("")
}
