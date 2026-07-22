import { useTranslation } from "react-i18next"

import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationElementProps {
	presentation_element: Schema.PresentationElementsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug
// @route: themePresentationElement
const ShowPresentationElement = ({ presentation_element }: ShowPresentationElementProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationElement">()
	const title = presentation_element.name || t("presentations.elements.show.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{
				title: t("presentations.elements.show.breadcrumb"),
				href: Routes.themePresentationElements(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
				),
			},
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group justify="space-between">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editThemePresentationElement(
								params.circle_slug,
								params.theme_slug,
								params.presentation_slug,
								presentation_element.slug,
							) }>
								{ t("presentations.elements.show.edit") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationElement
