import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPresentationProps {
	presentation: Schema.PresentationsShow
}

const ShowPresentation = ({ presentation }: IShowPresentationProps) => {
	const title =  'Presentation'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation', href: Routes.presentations() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
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

			</Section>
		</Page>
	)
}

export default ShowPresentation
