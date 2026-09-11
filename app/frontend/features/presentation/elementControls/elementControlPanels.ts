import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import { LeverageBarVisibilityOverrideControl } from "./LeverageBarVisibilityOverrideControl"
import { TimerDurationOverrideControl } from "./TimerDurationOverrideControl"

export interface ElementControlPanelProps {
	slideId: string
	elementId: string
	elementControls: ElementControlsPayload
	circleSlug: string
	presentationSlug: string
	disabled?: boolean
	onElementControlsUpdated?: (elementControls: ElementControlsPayload) => void
}

export const ELEMENT_CONTROL_PANELS = {
	Timer: TimerDurationOverrideControl,
	LeverageBar: LeverageBarVisibilityOverrideControl,
}

export type ControllableElementType = keyof typeof ELEMENT_CONTROL_PANELS

export function isControllableElementType(type: string): type is ControllableElementType {
	return Object.keys(ELEMENT_CONTROL_PANELS).includes(type)
}
