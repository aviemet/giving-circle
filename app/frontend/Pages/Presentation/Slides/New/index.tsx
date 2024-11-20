import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationSlideForm from '../Form'

interface NewPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesFormData
}

const NewPresentationSlide = ({ ...data }: NewPresentationSlideProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'New Slide'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Slides', href: Routes.presentationSlides() },
			{ title: 'New Slide', href: window.location.href },
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
