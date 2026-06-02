import { type Data } from "@measured/puck"

export const SLOT_MIN_EMPTY_HEIGHT = 96

export function editorStorageKey(templateKey?: string) {
	return `puck-editor-${templateKey ?? "data"}`
}

export function clearEditorDraft(templateKey?: string) {
	if(typeof window === "undefined") return

	try {
		window.localStorage.removeItem(editorStorageKey(templateKey))
	} catch{ }
}

const STARTER_CONTAINER_ID = "starter-container"
const STARTER_HEADING_ID = "starter-heading"

export function slotDropZoneProps() {
	return { minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT }
}

export function createStarterSlideData(): Partial<Data> {
	return {
		content: [
			{
				type: "Container",
				props: {
					id: STARTER_CONTAINER_ID,
					content: [
						{
							type: "Heading",
							props: {
								id: STARTER_HEADING_ID,
								title: "Slide title",
								padding: 16,
								order: 1,
								color: "#FFFFFF",
							},
						},
					],
					alignment: "left",
					flex: {
						display: "flex",
						flexDirection: "column",
						flexWrap: "nowrap",
					},
				},
			},
		],
		root: {
			props: {
				title: "Slide",
			},
		},
	}
}

export function withStarterSlideContent(data: Partial<Data>): Partial<Data> {
	if(data.content && data.content.length > 0) {
		return data
	}

	const starter = createStarterSlideData()
	const starterRoot = starter.root
	const dataRoot = data.root

	return {
		...data,
		content: starter.content,
		root: {
			...starterRoot,
			...dataRoot,
			props: {
				...starterRoot?.props,
				...dataRoot?.props,
			},
		},
	}
}
