import { useTranslation } from "react-i18next"

import { Stack, Text, Title } from "@/components"
import { type InteractionFieldConfig } from "@/domains/presentation/interactions/Form/FieldBuilder"
import {
	interactionConfigFrom,
	type InteractionConfig,
} from "@/domains/presentation/interactions/Form/interactionConfig"
import { responseDataFrom } from "@/domains/presentation/interactions/Form/ResponseFields"
import { type Money } from "@/types"

import { AllocationVoteForm } from "./allocation/AllocationVoteForm"
import { FinalistVoteForm } from "./finalistVote/FinalistVoteForm"
import * as classes from "./MemberInteractForm.css"
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

export interface MemberInteractFormProps {
	circleSlug: string
	presentationSlug: string
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation: Schema.PresentationsPresentation
	activeInteraction: ActiveInteractionProps
	availableFunds: Money | null
	availableVotes: number | null
	responseData?: unknown
	readOnly?: boolean
}

function moneyMapField(fields: InteractionFieldConfig[], key?: string) {
	return fields.find((field) => {
		if(field.type !== "org_money_map") return false
		if(key === undefined) return true
		return field.key === key
	})
}

export function MemberInteractForm({
	circleSlug,
	presentationSlug,
	circle,
	theme,
	presentation,
	activeInteraction,
	responseData,
	availableFunds,
	availableVotes,
	readOnly = false,
}: MemberInteractFormProps) {
	const { t } = useTranslation()
	const config: InteractionConfig = interactionConfigFrom(activeInteraction.config)
	const parsedResponseData = responseDataFrom(responseData)
	const uiSlug = activeInteraction.interaction_ui_template.slug

	if(readOnly) {
		return (
			<Stack className={ classes.root } gap="md">
				<Title order={ 2 }>{ activeInteraction.name }</Title>
				<Text>{ t("presentations.interact.form.closed") }</Text>
			</Stack>
		)
	}

	if(uiSlug === "pledges") {
		return (
			<PledgesForm
				circleSlug={ circleSlug }
				presentationSlug={ presentationSlug }
				circle={ circle }
				theme={ theme }
				presentation={ presentation }
				interactionName={ activeInteraction.name }
				context={ activeInteraction.context }
				readOnly={ readOnly }
			/>
		)
	}

	if(uiSlug === "finalist_vote") {
		const field = moneyMapField(config.fields, "votes") ?? moneyMapField(config.fields)
		if(!field || availableVotes === null) {
			return null
		}

		return (
			<FinalistVoteForm
				circleSlug={ circleSlug }
				presentationSlug={ presentationSlug }
				interactionName={ activeInteraction.name }
				field={ field }
				context={ activeInteraction.context }
				responseData={ responseData }
				availableVotes={ availableVotes }
				hasExistingResponse={ Object.keys(parsedResponseData).length > 0 }
			/>
		)
	}

	const field = moneyMapField(config.fields)
	if(!field || !availableFunds) {
		return null
	}

	return (
		<AllocationVoteForm
			circleSlug={ circleSlug }
			presentationSlug={ presentationSlug }
			interactionName={ activeInteraction.name }
			field={ field }
			context={ activeInteraction.context }
			responseData={ responseData }
			availableFunds={ availableFunds }
			hasExistingResponse={ Object.keys(parsedResponseData).length > 0 }
		/>
	)
}
