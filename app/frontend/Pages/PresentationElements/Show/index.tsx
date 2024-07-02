import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPresentationElementProps {
	presentation_element: Schema.PresentationElementsShow
}

const ShowPresentationElement = ({ presentation_element }: IShowPresentationElementProps) => {
	const title =  'PresentationElement'

	return (
		<Page title={ title }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationElement(presentation_element.id) }>
								Edit PresentationElement
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationElement
