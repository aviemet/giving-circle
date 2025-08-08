import { Page, Section } from "@/components"
import PresentationSlidesForm from "@/features/presentation/slides/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:id/edit
// @route: editThemePresentationsSlide
const EditPresentationSlide = ({ presentation_slide }: EditPresentationSlideProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"editThemePresentationsSlide">()
	const title = "Edit Slide"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Slides", href: Routes.presentationSlides() },
			{ title: "PresentationSlide", href: Routes.presentationSlide(presentation_slide.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<PresentationSlidesForm
					method="put"
					to={ Routes.presentationSlide() }
					presentation_slide={ presentation_slide }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationSlide
