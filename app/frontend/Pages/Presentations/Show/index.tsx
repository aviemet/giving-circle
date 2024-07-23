import React from 'react'
import { Group, Title, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:id
// @route: circleThemePresentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { params } = usePageProps<'circleThemePresentation'>()
	const title = presentation.name || 'Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleThemePresentation(params.circle_slug, params.theme_slug, params.id) }>
								Edit Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

				<Link as="button" href={ Routes.runPresentation(params.id) }>Start Presentation</Link>
			</Section>
		</Page>
	)
}

export default ShowPresentation
