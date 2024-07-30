import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationSlidesTable from '../Table'
import { Page } from '@/Components'

interface PresentationSlideIndexProps {
	presentation_slides: Schema.PresentationSlidesIndex[]
	pagination: Schema.Pagination
}

// @path: /presentation_slides
// @route: presentationSlides
const PresentationSlidesIndex = ({ presentation_slides, pagination }: PresentationSlideIndexProps) => {
	return (
		<Page
			title="PresentationSlides"
		>
			<IndexTableTemplate
				model="presentation_slides"
				rows={ presentation_slides }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.presentationSlides(),
			// 	[
			// 		{ label: 'New Presentation Slide', href: Routes.newPresentationSlide(), icon: NewIcon },
			// 	]
			// } }
			>
				<PresentationSlidesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationSlidesIndex
