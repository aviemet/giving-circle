import { Page, Section } from "@/components"
import PresentationSlideForm from "@/features/presentation/slides/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/new
// @route: newThemePresentationsSlide
const NewPresentationSlide = ({ ...data }: NewPresentationSlideProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"newThemePresentationsSlide">()
	const title = "New Slide"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Slides", href: Routes.presentationSlides() },
			{ title: "New Slide", href: window.location.href },
		] }>

			<Section>
				<PresentationSlideForm
					to={ Routes.presentationSlides() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationSlide
