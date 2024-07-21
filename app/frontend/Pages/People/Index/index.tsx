import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PeopleTable from '../Table'

interface PersonIndexProps {
	people: Schema.PeopleIndex[]
	pagination: Schema.Pagination
}

// @path: /people
// @route: people
const PeopleIndex = ({ people, pagination }: PersonIndexProps) => {
	return (
		<IndexPageTemplate
			title="People"
			model="people"
			rows={ people }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.people(),
				options: [
					{ label: 'New Person', href: Routes.newPerson(), icon: <NewIcon /> },
				],
			} }
		>
			<PeopleTable />
		</IndexPageTemplate>
	)
}

export default PeopleIndex
