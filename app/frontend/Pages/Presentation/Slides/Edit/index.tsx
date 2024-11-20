import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationSlidesForm from '../Form'

interface EditPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesEdit
}

const EditPresentationSlide = ({ presentation_slide }: EditPresentationSlideProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Slide'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Slides', href: Routes.presentationSlides() },
			{ title: "PresentationSlide", href: Routes.presentationSlide(presentation_slide.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<PresentationSlidesForm
					method='put'
					to={ Routes.presentationSlide() }
					presentation_slide={ presentation_slide }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationSlide
