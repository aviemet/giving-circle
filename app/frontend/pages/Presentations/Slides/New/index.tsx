import { Page, Section } from "@/components"
import { PresentationSlideForm } from "@/domains/presentation/slides/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationSlideProps {
	presentation_slide: Schema.SlidesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/new
// @route: newThemePresentationSlide
const NewPresentationSlide = ({ presentation_slide }: NewPresentationSlideProps) => {
	const { params } = usePageProps<"newThemePresentationSlide">()
	const title = "New Slide"
	const slidesIndexHref = Routes.themePresentationSlides(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
	)
	const submitHref = slidesIndexHref

	const slide: Schema.SlidesEdit = {
		id: presentation_slide.id ?? "",
		slug: presentation_slide.slug ?? "",
		data: presentation_slide.data,
		title: presentation_slide.title,
	}

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Slides", href: slidesIndexHref },
			{ title: "New Slide", href: window.location.href },
		] }>

			<Section>
				<PresentationSlideForm
					to={ submitHref }
					slide={ slide }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationSlide
