import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationSlidesTable from '../Table'

interface PresentationSlideIndexProps {
	presentation_slides: Schema.PresentationSlidesIndex[]
	pagination: Schema.Pagination
}

// @path: /presentation_slides
// @route: presentationSlides
const PresentationSlidesIndex = ({ presentation_slides, pagination }: PresentationSlideIndexProps) => {
	return (
		<IndexPageTemplate
			title="PresentationSlides"
			model="presentation_slides"
			rows={ presentation_slides }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.presentationSlides(),
				[
					{ label: 'New Presentation Slide', href: Routes.newPresentationSlide(), icon: NewIcon },
				]
			} }
		>
			<PresentationSlidesTable />
		</IndexPageTemplate>
	)
}

export default PresentationSlidesIndex
