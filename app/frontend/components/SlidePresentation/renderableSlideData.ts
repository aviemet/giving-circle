import { type PuckSlideData } from "@/components/VisualEditor/editorPersistence"

const EMPTY_PRESENTATION_SLIDE_DATA: PuckSlideData = {
	content: [],
	root: {
		props: {},
	},
}

export function renderableSlideData(data: PuckSlideData | null | undefined): PuckSlideData {
	if(data === null || data === undefined) {
		return EMPTY_PRESENTATION_SLIDE_DATA
	}

	if(data.root === null || data.root === undefined) {
		return {
			...data,
			content: data.content ?? [],
			root: {
				props: {},
			},
		}
	}

	return data
}
