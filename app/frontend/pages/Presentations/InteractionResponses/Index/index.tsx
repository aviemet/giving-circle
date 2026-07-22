import { useTranslation } from "react-i18next"

import { Page, Section, Title } from "@/components"
import { PresentationInteractionResponsesTable } from "@/domains/presentation/interactionResponses/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationInteractionResponsesIndexProps {
	presentation_interaction: Schema.PresentationInteractionsShow
	presentation_interaction_responses: Schema.PresentationInteractionResponsesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses
// @route: themePresentationInteractionResponses
const PresentationInteractionResponsesIndex = ({
	presentation_interaction,
	presentation_interaction_responses,
	pagination,
}: PresentationInteractionResponsesIndexProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteractionResponses">()
	const title = t("presentations.interaction_responses.index.title", { name: presentation_interaction.name })

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
			breadcrumbs={ [
				{
					title: t("presentations.interactions.index.title"),
					href: Routes.themePresentationInteractions(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					),
				},
				{
					title: presentation_interaction.name,
					href: Routes.themePresentationInteraction(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						presentation_interaction.slug,
					),
				},
				{ title: t("presentations.interaction_responses.index.title_short"), href: window.location.href },
			] }
		>
			<Section>
				<IndexTableTemplate
					model="presentation_interaction_responses"
					pagination={ pagination }
					contextMenu={ {
						options: [
							{
								label: t("presentations.interaction_responses.index.newResponse"),
								href: Routes.newThemePresentationInteractionResponse(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
									params.interaction_slug,
								),
							},
						],
					} }
				>
					<PresentationInteractionResponsesTable
						records={ presentation_interaction_responses }
						pagination={ pagination }
						model="presentation_interaction_responses"
					/>
				</IndexTableTemplate>
			</Section>
		</Page>
	)
}

export default PresentationInteractionResponsesIndex
