import { Page, Section } from "@/components"
import VisualEditor from "@/components/VisualEditor"
import { Routes } from "@/lib"

import PresentationSlidesForm from "../Form"

interface IEditPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesEdit
}

// @path: /presentation_slides/:id/edit
// @route: editPresentationSlide
const EditPresentationSlide = ({ presentation_slide }: IEditPresentationSlideProps) => {
	const title = "Edit Presentation Slide"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Presentation Slides", href: Routes.presentationSlides() },
			{ title: presentation_slide?.name || "", href: Routes.presentationSlide(presentation_slide.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<VisualEditor />
			</Section>
		</Page>
	)
}

export default EditPresentationSlide
