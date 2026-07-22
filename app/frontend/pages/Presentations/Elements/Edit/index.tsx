import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { PresentationElementForm } from "@/domains/presentation/elements/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationElementProps {
	presentation_element: Schema.PresentationElementsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug/edit
// @route: editThemePresentationElement
const EditPresentationElement = ({ presentation_element }: EditPresentationElementProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"editThemePresentationElement">()
	const title = t("presentations.elements.edit.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{
				title: t("presentations.elements.index.title"),
				href: Routes.themePresentationElements(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
				),
			},
			{
				title: presentation_element.name || t("presentations.elements.show.title"),
				href: Routes.themePresentationElement(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					presentation_element.slug,
				),
			},
			{ title, href: window.location.href },
		] }>
			<Section>
				<PresentationElementForm
					method="put"
					to={ Routes.themePresentationElement(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						presentation_element.slug,
					) }
					presentation_element={ presentation_element }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationElement
