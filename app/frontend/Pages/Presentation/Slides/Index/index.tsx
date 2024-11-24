import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import PresentationSlidesTable from '../Table'

interface PresentationSlideIndexProps {
	presentation_slides: Schema.PresentationSlidesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides
// @route: themePresentationSlides
const PresentationSlidesIndex = ({ presentation_slides, pagination }: PresentationSlideIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Slide'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationSlide() } icon={ <NewIcon /> }>
						New Slide
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				title="PresentationSlides"
				model="presentation_slides"
				rows={ presentation_slides }
				pagination={ pagination }
				contextMenu={
					[
						{
							label: 'New Slide',
							href: Routes.newPresentationSlide(),
							icon: NewIcon,
							deleteRoute: Routes.presentationSlides(),
						},
					]
				}
			>
				<PresentationSlidesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationSlidesIndex
