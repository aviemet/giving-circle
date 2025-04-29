import React from "react"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"

import PeopleTable from "../Table"


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
