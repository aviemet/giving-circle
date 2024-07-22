import React from 'react'
import { Group, Title, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /presentations/:id
// @route: presentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { params } = usePageProps<'presentation'>()
	const title = presentation.name || 'Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentation(params.id) }>
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
