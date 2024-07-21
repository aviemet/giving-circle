import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import GroupsTable from '../Table'

interface GroupIndexProps {
	groups: Schema.GroupsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/groups
// @route: circleGroups
const GroupsIndex = ({ groups, pagination, circle }: GroupIndexProps) => {
	return (
		<IndexPageTemplate
			title="Groups"
			model="groups"
			rows={ groups }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute:  Routes.groups(),
				options: [
					{ label: 'New Group', href: Routes.newCircleGroup(circle.slug), icon: <NewIcon /> },
				],
			} }
		>
			<GroupsTable />
		</IndexPageTemplate>
	)
}

export default GroupsIndex
