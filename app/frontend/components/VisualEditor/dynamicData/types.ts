export interface TagMention {
	type: "mention"
	tagPath: string
}

export interface TextContent {
	type: "text"
	content: string
}

export type ContentBlock = TagMention | TextContent

export interface StructuredContent {
	blocks: ContentBlock[]
}
