import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PeopleForm from '../Form'

interface EditPersonProps {
	person: Schema.PeopleEdit
}

const EditPerson = ({ person }: EditPersonProps) => {
	const title = `Edit ${person.name}`

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'People', href: Routes.people() },
			{ title: person.name, href: Routes.person(person.id) },
			{ title },
		] }>
			<Section>
				<Title>{ title }</Title>

				<PeopleForm
					method='put'
					to={ Routes.person(person.slug) }
					person={ person }
				/>
			</Section>
		</Page>
	)
}

export default EditPerson
