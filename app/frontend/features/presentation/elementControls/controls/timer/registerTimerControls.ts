import { TimerDurationOverrideControl } from "./TimerDurationOverrideControl"
import { registerElementControl } from "../../registry"

registerElementControl({
	elementType: "Timer",
	ControlPanel: TimerDurationOverrideControl,
})
