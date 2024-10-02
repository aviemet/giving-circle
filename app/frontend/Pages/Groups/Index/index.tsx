import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import GroupsTable from '../Table'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'

interface GroupIndexProps {
	groups: Schema.GroupsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/groups
// @route: circleGroups
const GroupsIndex = ({ groups, pagination, circle }: GroupIndexProps) => {
	const { params } = usePageProps<'circleGroups'>()
	const title = "Groups"

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newCircleGroup(params.circle_slug) } icon={ <NewIcon /> }>
						New Group
					</Menu.Link>
				</Menu>
			</> }
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
