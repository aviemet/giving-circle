import { type TagEditorOption } from "@/components/VisualEditor/lib/dynamicData"

const messagingTagOptions: TagEditorOption[] = [
	{ value: "circle.name", label: "Circle - name" },
	{ value: "presentation.name", label: "Presentation - name" },
	{ value: "membership.name", label: "Member - name" },
	{ value: "interact_url", label: "Interact URL" },
]

const messagingTagPaths = messagingTagOptions.map(option => option.value)

const MUSTACHE_TO_PATH: Record<string, string> = {
	member_name: "membership.name",
	"member.name": "membership.name",
	circle_name: "circle.name",
	"circle.name": "circle.name",
	presentation_name: "presentation.name",
	"presentation.name": "presentation.name",
	interact_url: "interact_url",
}

const normalizeMessagingTemplateString = (value: string): string => {
	if(!value) return ""

	return value.replace(/\{\{\s*([a-z0-9_.]+)\s*\}\}/gi, (_match, key: string) => {
		const path = MUSTACHE_TO_PATH[key.toLowerCase()]
		if(!path) return `#${key}`
		return `#${path}`
	})
}

export { messagingTagOptions, messagingTagPaths, normalizeMessagingTemplateString }
