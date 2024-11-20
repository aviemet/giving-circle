import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationSlideProps {
	presentation_slide: Schema.PresentationSlidesShow
}

const ShowPresentationSlide = ({ presentation_slide }: ShowPresentationSlideProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title =  'PresentationSlide'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Slide', href: Routes.presentationSlides() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
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