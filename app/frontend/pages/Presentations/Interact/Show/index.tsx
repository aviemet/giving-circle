import { router } from "@inertiajs/react"
import { useCallback } from "react"

import { IdleState, MemberInteractForm } from "@/features/presentation"
import { withLayout } from "@/lib"
import { type Money } from "@/types"

import { useActivePresentationChannel } from "../../Active/useActivePresentationChannel"

interface ShowPresentationInteractProps {
	presentation: Schema.PresentationsPresentation
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	active_interaction: Schema.PresentationInteractionsActiveInteraction | null
	presentation_interaction_response: Schema.PresentationInteractionResponsesShow | null
	available_funds: Money | null
	available_votes: number | null
}

// @path: /:circle_slug/p/:presentation_slug/interact
// @route: circlePresentationInteract
const ShowPresentationInteract = ({
	presentation,
	circle,
	theme,
	active_interaction,
	presentation_interaction_response,
	available_funds,
	available_votes,
}: ShowPresentationInteractProps) => {
	const handleActivePresentationUpdated = useCallback(() => {
		router.reload({
			only: [
				"active_interaction",
				"presentation_interaction_response",
				"available_funds",
				"available_votes",
			],
		})
	}, [])

	useActivePresentationChannel({
		presentationId: presentation.id,
		onActivePresentationUpdated: handleActivePresentationUpdated,
	})

	if(!active_interaction) {
		return <IdleState />
	}

	return (
		<MemberInteractForm
			circleSlug={ circle.slug }
			presentationSlug={ presentation.slug }
			circle={ circle }
			theme={ theme }
			presentation={ presentation }
			activeInteraction={ active_interaction }
			responseData={ presentation_interaction_response?.response_data }
			availableFunds={ available_funds }
			availableVotes={ available_votes }
			readOnly={ !active_interaction.accepting_responses }
		/>
	)
}

export default withLayout(ShowPresentationInteract, "unformatted")
