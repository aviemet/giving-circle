import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PeopleForm from '../Form'

interface IEditPersonProps {
	person: Schema.PeopleEdit
}

const EditPerson = ({ person }: IEditPersonProps) => {
	const title = 'Edit Person'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'People', href: Routes.people() },
			{ title: Person, href: Routes.person(person.id) },
			{ title },
		] }>
			<Section>
				<Heading>{ title }</Heading>
				
				<PeopleForm
					method='put'
					to={ Routes.person() }
					person={ person }
				/>
			</Section>
		</Page>
	)
}

export default EditPerson
