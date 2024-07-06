import React from 'react'
import { Group, Title, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const title = presentation.name || 'Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentation(presentation.id) }>
								Edit Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

				<Link as="button" href={ Routes.runPresentation(presentation.id) }>Start Presentation</Link>
			</Section>
		</Page>
	)
}

export default ShowPresentation
