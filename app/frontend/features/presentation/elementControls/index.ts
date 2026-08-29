export {
	type ElementControlPanelProps,
	type ElementControlDefinition,
	getElementControlDefinition,
	registerElementControl,
	registeredElementControlTypes,
} from "./registry"
export {
	type ScannedSlideElement,
	readElementControlValue,
	scanSlideElements,
} from "./types"
export { useTimerDurationOverrideSeconds } from "./controls/timer/TimerDurationOverrideControl"

import "./controls/timer/registerTimerControls"
