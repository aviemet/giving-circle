import { type PuckComponentProps } from "@/components/VisualEditor/components"
import {
	type ElementControlValue,
	type ElementControlsPayload,
} from "@/types/ElementControlsPayload"
import { type SlideData } from "@/types/SlideData"

export interface ScannedSlideElement {
	elementId: string
	elementType: keyof PuckComponentProps
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

const CONTROLLABLE_ELEMENT_TYPES = new Set<string>([
	"Timer",
])

function isControllableElementType(type: string): type is keyof PuckComponentProps {
	return CONTROLLABLE_ELEMENT_TYPES.has(type)
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

export type SlideDataLike = {
	content?: unknown
}

export function scanSlideElements(slideData: SlideData | SlideDataLike | null | undefined): ScannedSlideElement[] {
	const results: ScannedSlideElement[] = []

	if(slideData === null || slideData === undefined) {
		return results
	}

	walkContentNodes(slideData.content, results)

	return results
}

export function readElementControlValue(
	elementControls: ElementControlsPayload | undefined,
	slideId: string,
	elementId: string,
	elementType: keyof PuckComponentProps,
	control: string,
): ElementControlValue | undefined {
	const slideControls = elementControls?.[slideId]
	const instanceControls = slideControls?.[elementId]
	const typeControls = instanceControls?.[elementType]
	const value = typeControls?.[control]

	if(value === undefined || typeof value !== "object" || value === null || Array.isArray(value)) {
		return undefined
	}

	return value
}
