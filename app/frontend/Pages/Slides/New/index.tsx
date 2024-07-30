import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationSlideForm from '../Form'

interface INewPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesFormData
}

// @path: /presentation_slides/new
// @route: newPresentationSlide
const NewPresentationSlide = ({ ...data }: INewPresentationSlideProps) => {
	const title = 'New Presentation Slide'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Slides', href: Routes.presentationSlides() },
			{ title: 'New Presentation Slide', href: window.location.href },
		] }>

			<Section>
				<Heading>{ title }</Heading>

				<PresentationSlideForm
					to={ Routes.presentationSlides() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationSlide
