import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import PresentationSlidesTable from "@/features/presentation/slides/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface PresentationSlideIndexProps {
	presentation_slides: Schema.PresentationSlidesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides
// @route: themePresentationsSlides
const PresentationSlidesIndex = ({ presentation_slides, pagination }: PresentationSlideIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"themePresentationsSlides">()
	const title = "Slide"

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationSlide() } icon={ <NewIcon /> }>
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
				contextMenu={
					[
						{
							label: "New Slide",
							href: Routes.newPresentationSlide(),
							icon: NewIcon,
							deleteRoute: Routes.presentationSlides(),
						},
					]
				}
			>
				<PresentationSlidesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationSlidesIndex
