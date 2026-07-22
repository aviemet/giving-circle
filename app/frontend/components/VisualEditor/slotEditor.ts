import { defaultBackgroundImageValue } from "./fields/backgroundImage"

import { type PuckSlideData } from "./index"

export const SLOT_MIN_EMPTY_HEIGHT = 96

export const DRAG_SLOT_GUTTER_PX = 40
export const DRAG_SLOT_EDGE_PX = 20
export const DRAG_SLOT_GAP_PX = 36
export const DRAG_HITBOX_HEIGHT_PX = 44


export function slotDropZoneProps() {
	return { minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT }
}

export function createStarterSlideData(): PuckSlideData {
	return {
		content: [
			{
				type: "Container",
				props: {
					id: "starter-container",
					content: [
						{
							type: "Heading",
							props: {
								id: "starter-heading",
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
						overflow: "visible",
					},
				},
			},
		],
		root: {
			props: {
				title: "Slide",
				backgroundColor: "#000000",
				backgroundImage: defaultBackgroundImageValue(),
			},
		},
	}
}

export function withStarterSlideContent(data: PuckSlideData): PuckSlideData {
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
