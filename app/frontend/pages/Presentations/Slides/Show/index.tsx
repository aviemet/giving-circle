import { useTranslation } from "react-i18next"

import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationSlideProps {
	presentation_slide: Schema.SlidesShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug
// @route: themePresentationSlide
const ShowPresentationSlide = ({ presentation_slide }: ShowPresentationSlideProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationSlide">()
	const title = presentation_slide.title || t("slides.show.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{
				title: t("slides.show.title"),
				href: Routes.themePresentationSlides(
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
							<Menu.Link href={ Routes.editThemePresentationSlide(
								params.circle_slug,
								params.theme_slug,
								params.presentation_slug,
								presentation_slide.slug,
							) }>
								{ t("slides.show.edit") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationSlide
