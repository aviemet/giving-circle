import { useTranslation } from "react-i18next"

import { Badge, Group, Menu, Page, Section, Stack, Text } from "@/components"
import { interactionConfigFrom } from "@/domains/presentation/interactions/Form/interactionConfig"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationInteractionProps {
	presentation_interaction: Schema.PresentationInteractionsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug
// @route: themePresentationInteraction
const ShowPresentationInteraction = ({ presentation_interaction }: ShowPresentationInteractionProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteraction">()
	const title = presentation_interaction.name
	const acceptingResponses = presentation_interaction.accepting_responses
	const fieldCount = interactionConfigFrom(presentation_interaction.config).fields.length

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{
					title: t("presentations.interactions.index.title"),
					href: Routes.themePresentationInteractions(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					),
				},
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<Stack gap="md">
					<Group justify="space-between">
						<Badge color={ acceptingResponses ? "green" : "gray" }>
							{ acceptingResponses
								? t("presentations.interactions.show.accepting_responses")
								: t("presentations.interactions.show.closed") }
						</Badge>
						<Menu position="bottom-end">
							<Menu.Target />
							<Menu.Dropdown>
								<Menu.Link href={ Routes.editThemePresentationInteraction(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
									presentation_interaction.slug,
								) }>
									{ t("presentations.interactions.show.edit") }
								</Menu.Link>
								<Menu.Link href={ Routes.themePresentationInteractionResponses(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
									presentation_interaction.slug,
								) }>
									{ t("presentations.interactions.show.responses") }
								</Menu.Link>
							</Menu.Dropdown>
						</Menu>
					</Group>
					<Text size="sm" c="dimmed">
						{ t("presentations.interactions.show.data_points_configured", { count: fieldCount }) }
					</Text>
				</Stack>
			</Section>
		</Page>
	)
}

export default ShowPresentationInteraction
