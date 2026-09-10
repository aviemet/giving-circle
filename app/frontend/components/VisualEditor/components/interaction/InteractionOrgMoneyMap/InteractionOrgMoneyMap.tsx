import { PuckComponent } from "@puckeditor/core"

import { InteractionOrgMoneyMapDisplay } from "./InteractionOrgMoneyMapDisplay"
import { InteractionOrgMoneyMapEditor } from "./InteractionOrgMoneyMapEditor"

export type InteractionOrgMoneyMapProps = {
	fieldKey: string
	label: string
	outputMetric?: string
	widget?: "cards"
}

export type InteractionOrgMoneyMapComponentProps = Parameters<PuckComponent<InteractionOrgMoneyMapProps>>[0]

export function InteractionOrgMoneyMap(props: InteractionOrgMoneyMapComponentProps) {
	return props.puck.isEditing
		? <InteractionOrgMoneyMapEditor { ...props } />
		: <InteractionOrgMoneyMapDisplay { ...props } />
}

export { interactionOrgMoneyMapCanSubmit } from "./InteractionOrgMoneyMapDisplay"
