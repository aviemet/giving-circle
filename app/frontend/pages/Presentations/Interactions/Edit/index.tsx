import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { PresentationInteractionForm } from "@/domains/presentation/interactions/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditPresentationInteractionProps {
	presentation_interaction: Schema.PresentationInteractionsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug/edit
// @route: editThemePresentationInteraction
const EditPresentationInteraction = ({ presentation_interaction }: EditPresentationInteractionProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"editThemePresentationInteraction">()
	const title = t("presentations.interactions.edit.breadcrumb")

	return (
		<Page
			title={ `${title} ${presentation_interaction.name}` }
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
						params.slug,
					),
				},
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<PresentationInteractionForm
					to={ Routes.themePresentationInteraction(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						params.slug,
					) }
					method="patch"
					presentation_interaction={ presentation_interaction }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationInteraction
