import { PuckComponent } from "@puckeditor/core"

import { InteractionOrgReferenceDisplay } from "./InteractionOrgReferenceDisplay"
import { InteractionOrgReferenceEditor } from "./InteractionOrgReferenceEditor"

export type InteractionOrgReferenceProps = {
	fieldKey: string
	label: string
	outputMetric?: string
}

export type InteractionOrgReferenceComponentProps = Parameters<PuckComponent<InteractionOrgReferenceProps>>[0]

export function InteractionOrgReference(props: InteractionOrgReferenceComponentProps) {
	return props.puck.isEditing
		? <InteractionOrgReferenceEditor { ...props } />
		: <InteractionOrgReferenceDisplay { ...props } />
}
