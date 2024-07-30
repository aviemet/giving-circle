import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import GroupsTable from '../Table'
import { usePageProps } from '@/lib/hooks'
import { Page } from '@/Components'

interface GroupIndexProps {
	groups: Schema.GroupsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/groups
// @route: circleGroups
const GroupsIndex = ({ groups, pagination, circle }: GroupIndexProps) => {
	const { params } = usePageProps<'circleGroups'>()

	return (
		<Page
			title="Groups"
			// contextMenu={ {
			// 	deleteRoute:  Routes.groups(),
			// 	options: [
			// 		{ label: 'New Group', href: Routes.newCircleGroup(params.circle_slug), icon: <NewIcon /> },
			// 	],
			// } }
		>
			<IndexTableTemplate
				model="groups"
				rows={ groups }
				pagination={ pagination }
			>
				<GroupsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default GroupsIndex
