import { type PuckComponentProps } from "@/components/VisualEditor/components"

import { type InteractionBooleanInputProps } from "./InteractionBooleanInput"
import { type InteractionOrgMoneyMapProps } from "./InteractionOrgMoneyMap"
import { type InteractionOrgReferenceProps } from "./InteractionOrgReference"
import { type MemberRootProps } from "./MemberRoot"

export type MemberPuckComponentProps = {
	InteractionOrgMoneyMap: InteractionOrgMoneyMapProps
	InteractionBooleanInput: InteractionBooleanInputProps
	InteractionOrgReference: InteractionOrgReferenceProps
} & Pick<PuckComponentProps, "Heading" | "Text" | "Container" | "Grid">

export type { MemberRootProps }

export { InteractionOrgMoneyMap, interactionOrgMoneyMapConfig } from "./InteractionOrgMoneyMap"
export { InteractionBooleanInput, interactionBooleanInputConfig } from "./InteractionBooleanInput"
export { InteractionOrgReference, interactionOrgReferenceConfig } from "./InteractionOrgReference"
export { MemberRoot, MemberRootDisplay, memberRootDefaultProps, memberRootFields } from "./MemberRoot"
