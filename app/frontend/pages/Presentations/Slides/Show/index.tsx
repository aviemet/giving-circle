import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationSlideProps {
	presentation_slide: Schema.SlidesShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug
// @route: themePresentationSlide
const ShowPresentationSlide = ({ presentation_slide }: ShowPresentationSlideProps) => {
	const { params } = usePageProps<"themePresentationSlide">()
	const title = "PresentationSlide"

	return (
		<Page title={ title } breadcrumbs={ [
			{
				title: "Slide",
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
								Edit PresentationSlide
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationSlide
