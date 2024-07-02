import React from 'react'
import { Group, Heading, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

const ShowPresentation = ({ presentation }: IShowPresentationProps) => {
	const title = presentation.name || 'Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Heading>{ title }</Heading>

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
