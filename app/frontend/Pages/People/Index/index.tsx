import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PeopleTable from '../Table'
import { Page } from '@/Components'

interface PersonIndexProps {
	people: Schema.PeopleIndex[]
	pagination: Schema.Pagination
}

// @path: /people
// @route: people
const PeopleIndex = ({ people, pagination }: PersonIndexProps) => {
	return (
		<Page
			title="People"
		>
			<IndexTableTemplate
				model="people"
				rows={ people }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.people(),
			// 	options: [
			// 		{ label: 'New Person', href: Routes.newPerson(), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<PeopleTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PeopleIndex
