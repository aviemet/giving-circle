import { type InteractionOrgReferenceComponentProps } from "./InteractionOrgReference"
import { InteractionOrgReferenceDisplay } from "./InteractionOrgReferenceDisplay"

export function InteractionOrgReferenceEditor(props: InteractionOrgReferenceComponentProps) {
	return <InteractionOrgReferenceDisplay { ...props } />
}
