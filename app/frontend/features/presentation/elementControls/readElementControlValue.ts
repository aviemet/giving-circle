import {
	type ElementControlValue,
	type ElementControlsPayload,
} from "@/types/ElementControlsPayload"

export function readElementControlValue(
	elementControls: ElementControlsPayload | undefined,
	slideId: string,
	elementId: string,
	elementType: string,
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
