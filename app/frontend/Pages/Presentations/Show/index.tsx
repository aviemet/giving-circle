import React, { useRef } from 'react'
import { Group, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { useInit, usePageProps } from '@/lib/hooks'
import VisualEditor from '@/Components/VisualEditor'
import { useLayoutStore } from '@/Store'

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug
// @route: circleThemePresentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { toggleSidebarOpen } = useLayoutStore()
	const { params } = usePageProps<'circleThemePresentation'>()
	const title = presentation.name || 'Presentation'

	useInit(() => {
		toggleSidebarOpen(false)
	})

	return (
		<Page
			title={ title }
			disablePadding
		>
			<Section>
				<VisualEditor />
				{ /* <Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.circleThemeEditPresentation(params.circle_slug, params.theme_slug, params.presentation_slug) }>
								Edit Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group> */ }

				{ /* <Link as="button" href={ Routes.activePresentationShow(params.presentation_slug) }>Start Presentation</Link> */ }
			</Section>
		</Page>
	)
}

export default ShowPresentation
