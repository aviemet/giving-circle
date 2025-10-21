export interface TagMention {
	type: "mention"
	tagPath: string
	label: string
	position: {
		start: number
		end: number
	}
}

export interface TextContent {
	type: "text"
	content: string
	position: {
		start: number
		end: number
	}
}

export type ContentBlock = TagMention | TextContent

export interface StructuredContent {
	blocks: ContentBlock[]
	rawText: string
}
