import { type SlideData } from "@/types/SlideData"

import {
	isControllableElementType,
	type ControllableElementType,
} from "./elementControlPanels"

export interface ScannedSlideElement {
	elementId: string
	elementType: ControllableElementType
}

interface PuckContentNode {
	type?: string
	props?: Record<string, unknown>
}

function isPuckContentNode(value: unknown): value is PuckContentNode {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isPuckContentArray(value: unknown): value is PuckContentNode[] {
	return Array.isArray(value)
}

function walkContentNodes(nodes: unknown, results: ScannedSlideElement[]) {
	if(!isPuckContentArray(nodes)) {
		return
	}

	for(const node of nodes) {
		if(!isPuckContentNode(node)) {
			continue
		}

		const elementType = node.type
		const props = node.props
		const elementId = typeof props?.id === "string" ? props.id : undefined

		if(elementType !== undefined && elementId !== undefined && isControllableElementType(elementType)) {
			results.push({ elementId, elementType })
		}

		if(props !== undefined) {
			for(const propValue of Object.values(props)) {
				if(isPuckContentArray(propValue)) {
					walkContentNodes(propValue, results)
				}
			}
		}
	}
}

export function scanSlideElements(slideData: SlideData | { content?: unknown } | null | undefined): ScannedSlideElement[] {
	const results: ScannedSlideElement[] = []

	if(slideData === null || slideData === undefined) {
		return results
	}

	walkContentNodes(slideData.content, results)

	return results
}
