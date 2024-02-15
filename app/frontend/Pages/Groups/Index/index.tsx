import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import GroupsTable from '../Table'

interface IGroupIndexProps {
	groups: Schema.GroupsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

const GroupsIndex = ({ groups, pagination, circle }: IGroupIndexProps) => {
	return (
		<IndexPageTemplate
			title="Groups"
			model="groups"
			rows={ groups }
			pagination={ pagination }
			deleteRoute={ Routes.groups() }
			menuOptions={ [
				{ label: 'New Group', href: Routes.newCircleGroup(circle.slug), icon: NewIcon },
			] }
		>
			<GroupsTable />
		</IndexPageTemplate>
	)
}

export default GroupsIndex
