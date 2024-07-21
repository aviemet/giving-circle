import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowPersonProps {
	person: Schema.PeopleShow
}

// @path: /people/:slug
// @route: person
const ShowPerson = ({ person }: ShowPersonProps) => {
	const title =  'Person'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Person', href: Routes.people() },
			{ title },
		] }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPerson(person.id) }>
								Edit Person
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPerson
