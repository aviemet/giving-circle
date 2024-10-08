import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'

interface MemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/themes/:theme_slug/members
// @route: circleThemeMemberIndex
const MembersIndex = ({ members, pagination, theme, circle }: MemberIndexProps) => {
	const { params } = usePageProps<'circleThemeMemberIndex'>()

	return (
		<IndexTableTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			contextMenu={ {
				label: 'Add Members to Theme',
				options: [
					{
						label: 'Add New Member To Theme',
						href: Routes.newCircleThemeMember(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					},
					{
						label: 'Add Existing Member To Theme',
						href: Routes.newCircleThemeMember(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					},
					// {
					// 	label: 'Import Members From File',
					// 	href: Routes.circleThemeMembersImport(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					// },
				],
			} }
		>
			<MembersTable />
		</IndexTableTemplate>
	)
}

export default MembersIndex
