import { type InteractionOrgMoneyMapComponentProps } from "./InteractionOrgMoneyMap"
import { InteractionOrgMoneyMapDisplay } from "./InteractionOrgMoneyMapDisplay"

export function InteractionOrgMoneyMapEditor(props: InteractionOrgMoneyMapComponentProps) {
	return <InteractionOrgMoneyMapDisplay { ...props } />
}
