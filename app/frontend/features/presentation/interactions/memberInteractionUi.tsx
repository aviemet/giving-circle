import { type ComponentType } from "react"

import { type Money } from "@/types"

import { AllocationVoteForm } from "./allocation/AllocationVoteForm"
import { FinalistVoteForm } from "./finalistVote/FinalistVoteForm"
import { PledgesForm } from "./pledges/PledgesForm"

export interface ActiveInteractionProps {
	id: string
	name: string
	slug: string
	accepting_responses: boolean
	config: unknown
	context?: unknown
	interaction_ui_template: {
		id: string
		slug: string
		name: string
	}
}

export interface MemberInteractionUiProps {
	circleSlug: string
	presentationSlug: string
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation: Schema.PresentationsPresentation
	activeInteraction: ActiveInteractionProps
	responseData?: unknown
	availableFunds: Money | null
	availableVotes: number | null
}

export type MemberInteractionUiComponent = ComponentType<MemberInteractionUiProps>

export const memberInteractionUiBySlug: Record<string, MemberInteractionUiComponent> = {
	allocation: AllocationVoteForm,
	finalist_vote: FinalistVoteForm,
	pledges: PledgesForm,
}
