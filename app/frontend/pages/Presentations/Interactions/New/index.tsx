import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { PresentationInteractionForm } from "@/domains/presentation/interactions/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewPresentationInteractionProps {
	presentation_interaction: Schema.PresentationInteractionsFormData & {
		slides?: Schema.SlidesPersisted[]
	}
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/new
// @route: newThemePresentationInteraction
const NewPresentationInteraction = ({ presentation_interaction }: NewPresentationInteractionProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"newThemePresentationInteraction">()
	const title = t("presentations.interactions.new.title")

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
				<PresentationInteractionForm
					to={ Routes.themePresentationInteractions(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					) }
					presentation_interaction={ presentation_interaction }
				/>
			</Section>
		</Page>
	)
}

export default NewPresentationInteraction
