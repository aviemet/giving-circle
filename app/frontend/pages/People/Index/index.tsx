import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import PeopleTable from "@/features/people/Table"
import { Routes } from "@/lib"


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
