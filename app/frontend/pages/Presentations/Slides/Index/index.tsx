import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { PresentationSlideTable } from "@/features/presentation/slides/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface PresentationSlideIndexProps {
	presentation_slides: Schema.SlidesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides
// @route: themePresentationSlides
const PresentationSlidesIndex = ({ presentation_slides, pagination }: PresentationSlideIndexProps) => {
	const { params } = usePageProps<"themePresentationSlides">()
	const title = "Slide"
	const slidesIndexHref = Routes.themePresentationSlides(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
	)
	const newSlideHref = Routes.newThemePresentationSlide(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
	)

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ newSlideHref } icon={ <NewIcon /> }>
						New Slide
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				title="PresentationSlides"
				model="presentation_slides"
				rows={ presentation_slides }
				pagination={ pagination }
				contextMenu={ {
					options: [
						{
							label: "New Slide",
							href: newSlideHref,
							icon: <NewIcon />,
						},
					],
					deleteRoute: slidesIndexHref,
				} }
			>
				<PresentationSlideTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationSlidesIndex
