import { type CSSProperties } from "react"

import { type PuckSlideData } from "./EditorSave/editorPersistence"
import { defaultBackgroundValue } from "../fields/backgroundImage"


export const SLOT_MIN_EMPTY_HEIGHT = 96

export const LAYOUT_CHROME_PAD_PX = 16
export const LAYOUT_CHROME_LABEL_SPACE_PX = 22

export const DRAG_SLOT_GUTTER_PX = 40
export const DRAG_SLOT_EDGE_PX = 20
export const DRAG_SLOT_GAP_PX = 36
export const DRAG_HITBOX_HEIGHT_PX = 44


export function slotDropZoneProps() {
	return { minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT }
}

function addChromePadding(value: CSSProperties["paddingTop"], extraPx: number) {
	if(value === undefined || value === 0 || value === "0" || value === "0px") {
		return `${ extraPx }px`
	}

	if(typeof value === "number") {
		return `${ value + extraPx }px`
	}

	return `calc(${ value } + ${ extraPx }px)`
}

export function withEditorLayoutChromePadding(style: CSSProperties): CSSProperties {
	return {
		...style,
		paddingTop: addChromePadding(style.paddingTop, LAYOUT_CHROME_LABEL_SPACE_PX),
		paddingRight: addChromePadding(style.paddingRight, LAYOUT_CHROME_PAD_PX),
		paddingBottom: addChromePadding(style.paddingBottom, LAYOUT_CHROME_PAD_PX),
		paddingLeft: addChromePadding(style.paddingLeft, LAYOUT_CHROME_PAD_PX),
	}
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
								alignment: "left",
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
				background: defaultBackgroundValue("#000000"),
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
