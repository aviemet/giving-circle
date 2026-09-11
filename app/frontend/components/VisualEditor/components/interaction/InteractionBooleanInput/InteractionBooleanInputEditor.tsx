import { type InteractionBooleanInputComponentProps } from "./InteractionBooleanInput"
import { InteractionBooleanInputDisplay } from "./InteractionBooleanInputDisplay"

export function InteractionBooleanInputEditor(props: InteractionBooleanInputComponentProps) {
	return <InteractionBooleanInputDisplay { ...props } />
}
