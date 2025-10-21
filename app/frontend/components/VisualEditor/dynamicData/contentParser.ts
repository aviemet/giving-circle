import { ContentBlock, StructuredContent } from "./types"

export const parseContentToStructured = (content: string): StructuredContent => {
	const blocks: ContentBlock[] = []
	let currentIndex = 0

	// First try to parse HTML mentions
	const htmlMentionRegex = /<span[^>]*class="mention"[^>]*>#([^<]+)<\/span>/g
	let match

	while((match = htmlMentionRegex.exec(content)) !== null) {
		if(match.index > currentIndex) {
			blocks.push({
				type: "text",
				content: content.slice(currentIndex, match.index),
				position: {
					start: currentIndex,
					end: match.index,
				},
			})
		}

		blocks.push({
			type: "mention",
			tagPath: match[1],
			label: `#${match[1]}`,
			position: {
				start: match.index,
				end: match.index + match[0].length,
			},
		})

		currentIndex = match.index + match[0].length
	}

	// If no HTML mentions found, try plain text hashtags
	if(blocks.length === 0) {
		const tagRegex = /#([^#\s]+)/g
		let textMatch

		while((textMatch = tagRegex.exec(content)) !== null) {
			if(textMatch.index > currentIndex) {
				blocks.push({
					type: "text",
					content: content.slice(currentIndex, textMatch.index),
					position: {
						start: currentIndex,
						end: textMatch.index,
					},
				})
			}

			blocks.push({
				type: "mention",
				tagPath: textMatch[1],
				label: `#${textMatch[1]}`,
				position: {
					start: textMatch.index,
					end: textMatch.index + textMatch[0].length,
				},
			})

			currentIndex = textMatch.index + textMatch[0].length
		}
	}

	if(currentIndex < content.length) {
		blocks.push({
			type: "text",
			content: content.slice(currentIndex),
			position: {
				start: currentIndex,
				end: content.length,
			},
		})
	}

	return {
		blocks,
		rawText: content,
	}
}

export const serializeStructuredContent = (structured: StructuredContent): string => {
	return structured.blocks.map(block => {
		if(block.type === "mention") {
			return `#${block.tagPath}`
		}
		return block.content
	}).join("")
}

export const renderStructuredContent = (structured: StructuredContent, evaluateTag: (tagPath: string) => string): string => {
	return structured.blocks.map(block => {
		if(block.type === "mention") {
			return evaluateTag(block.tagPath)
		}
		return block.content
	}).join("")
}
