import { useTranslation } from "react-i18next"

import { Page, Section, Title } from "@/components"
import { PresentationInteractionsTable } from "@/domains/presentation/interactions/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationInteractionsIndexProps {
	presentation_interactions: Schema.PresentationInteractionsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions
// @route: themePresentationInteractions
const PresentationInteractionsIndex = ({ presentation_interactions, pagination }: PresentationInteractionsIndexProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteractions">()
	const title = t("presentations.interactions.index.title")

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
			breadcrumbs={ [
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<IndexTableTemplate
					model="presentation_interactions"
					pagination={ pagination }
					contextMenu={ {
						options: [
							{
								label: t("presentations.interactions.index.newInteraction"),
								href: Routes.newThemePresentationInteraction(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
								),
							},
						],
					} }
				>
					<PresentationInteractionsTable
						records={ presentation_interactions }
						pagination={ pagination }
						model="presentation_interactions"
					/>
				</IndexTableTemplate>
			</Section>
		</Page>
	)
}

export default PresentationInteractionsIndex
