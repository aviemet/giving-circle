import React from "react"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"

import PresentationSlidesTable from "../Table"


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
