import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { PresentationInteractionResponseForm } from "@/domains/presentation/interactionResponses/Form"
import { interactionConfigFrom } from "@/domains/presentation/interactions/Form/interactionConfig"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewPresentationInteractionResponseProps {
	presentation_interaction: Schema.PresentationInteractionsShow
	presentation_interaction_response: Schema.PresentationInteractionResponsesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/new
// @route: newThemePresentationInteractionResponse
const NewPresentationInteractionResponse = ({
	presentation_interaction,
	presentation_interaction_response,
}: NewPresentationInteractionResponseProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"newThemePresentationInteractionResponse">()
	const title = t("presentations.interaction_responses.new.title")
	const interactionConfig = interactionConfigFrom(presentation_interaction.config)

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{
					title: t("presentations.interaction_responses.index.title_short"),
					href: Routes.themePresentationInteractionResponses(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						params.interaction_slug,
					),
				},
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<PresentationInteractionResponseForm
					to={ Routes.themePresentationInteractionResponses(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						params.interaction_slug,
					) }
					presentation_interaction_response={ presentation_interaction_response }
					interaction_config={ interactionConfig }
				/>
			</Section>
		</Page>
	)
}

export default NewPresentationInteractionResponse
