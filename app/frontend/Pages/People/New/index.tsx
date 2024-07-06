import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PersonForm from '../Form'

interface NewPersonProps {
	person: Schema.PeopleFormData
}

const NewPerson = ({ ...data }: NewPersonProps) => {
	const title = 'New Person'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'People', href: Routes.people() },
			{ title: 'New Person' },
		] }>

			<Section>
				<Title>{ title }</Title>

				<PersonForm
					to={ Routes.people() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPerson
