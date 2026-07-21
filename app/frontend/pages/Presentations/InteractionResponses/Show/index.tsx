import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationInteractionResponseProps {
	presentation_interaction: Schema.PresentationInteractionsShow
	presentation_interaction_response: Schema.PresentationInteractionResponsesShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id
// @route: themePresentationInteractionResponse
const ShowPresentationInteractionResponse = ({
	presentation_interaction,
	presentation_interaction_response,
}: ShowPresentationInteractionResponseProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteractionResponse">()
	const title = t("presentations.interaction_responses.show.title")

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{
					title: presentation_interaction.name,
					href: Routes.themePresentationInteraction(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						presentation_interaction.slug,
					),
				},
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
				{ presentation_interaction_response.membership?.name }
			</Section>
		</Page>
	)
}

export default ShowPresentationInteractionResponse
