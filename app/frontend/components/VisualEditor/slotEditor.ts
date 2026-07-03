import { type Data } from "@measured/puck"

import { defaultBackgroundImageValue } from "./fields/backgroundImage"

export const SLOT_MIN_EMPTY_HEIGHT = 96


export function slotDropZoneProps() {
	return { minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT }
}

export function createStarterSlideData(): Partial<Data> {
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
				backgroundImage: defaultBackgroundImageValue(),
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
