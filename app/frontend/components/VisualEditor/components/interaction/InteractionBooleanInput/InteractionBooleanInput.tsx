import { PuckComponent } from "@puckeditor/core"

import { InteractionBooleanInputDisplay } from "./InteractionBooleanInputDisplay"
import { InteractionBooleanInputEditor } from "./InteractionBooleanInputEditor"

export type InteractionBooleanInputProps = {
	fieldKey: string
	label: string
}

export type InteractionBooleanInputComponentProps = Parameters<PuckComponent<InteractionBooleanInputProps>>[0]

export function InteractionBooleanInput(props: InteractionBooleanInputComponentProps) {
	return props.puck.isEditing
		? <InteractionBooleanInputEditor { ...props } />
		: <InteractionBooleanInputDisplay { ...props } />
}
