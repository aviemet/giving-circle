import { type DefaultRootRenderProps } from "@puckeditor/core"

import { MemberRootDisplay } from "./MemberRootDisplay"
import { MemberRootEditor } from "./MemberRootEditor"
import { type SlideRootProps } from "../../../lib/SlideRoot"

export type MemberRootProps = SlideRootProps & {
	stage?: number
	outputMetric?: string
	fundingBasis?: string | string[]
	excludeFundedOrgs?: boolean
	defaultVotes?: number
	allowNonFinalists?: boolean
	allowOverAsk?: boolean
}

export type MemberRootComponentProps = DefaultRootRenderProps<MemberRootProps>

export function MemberRoot(props: MemberRootComponentProps) {
	return props.puck.isEditing
		? <MemberRootEditor { ...props } />
		: <MemberRootDisplay { ...props } />
}
