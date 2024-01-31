import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPersonProps {
	person: Schema.PeopleShow
}

const ShowPerson = ({ person }: IShowPersonProps) => {
	const title =  'Person'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Person', href: Routes.people() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

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
