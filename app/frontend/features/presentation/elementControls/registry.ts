import { type ReactElement } from "react"

import { type PuckComponentProps } from "@/components/VisualEditor/components"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

export interface ElementControlPanelProps {
	slideId: string
	elementId: string
	elementType: keyof PuckComponentProps
	elementControls: ElementControlsPayload
	circleSlug: string
	presentationSlug: string
	disabled?: boolean
	onElementControlsUpdated?: (elementControls: ElementControlsPayload) => void
}

export interface ElementControlDefinition {
	elementType: keyof PuckComponentProps
	ControlPanel: (props: ElementControlPanelProps) => ReactElement
}

const registry = new Map<keyof PuckComponentProps, ElementControlDefinition>()

export function registerElementControl(definition: ElementControlDefinition) {
	registry.set(definition.elementType, definition)
}

export function getElementControlDefinition(
	elementType: keyof PuckComponentProps,
): ElementControlDefinition | undefined {
	return registry.get(elementType)
}

export function registeredElementControlTypes(): Array<keyof PuckComponentProps> {
	return [...registry.keys()]
}
