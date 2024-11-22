import React from 'react'
import { Group, Link, Menu, Page, Section, Title } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/presentations/:slug
// @route: presentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { params } = usePageProps<'circleThemePresentation'>()
	const title = presentation.name || 'Presentation'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.circleThemeEditPresentation(params.circle_slug, params.theme_slug, params.presentation_slug) }>
								Edit Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
		>
			<Section>
				<Link as="button" href={ Routes.activePresentationShow(params.presentation_slug) }>Start Presentation</Link>
			</Section>
		</Page>
	)
}

export default ShowPresentation
