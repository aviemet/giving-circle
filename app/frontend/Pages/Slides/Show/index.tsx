import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesShow
}

// @path: /presentation_slides/:id
// @route: presentationSlide
const ShowPresentationSlide = ({ presentation_slide }: IShowPresentationSlideProps) => {
	const title =  'PresentationSlide'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Slide', href: Routes.presentationSlides() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationSlide(presentation_slide.id) }>
								Edit PresentationSlide
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationSlide
