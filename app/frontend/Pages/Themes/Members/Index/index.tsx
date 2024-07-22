import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import MembersTable from '../Table'

interface MemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesShallow
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/themes/:theme_slug/members
// @route: circleThemeMembers
const MembersIndex = ({ members, pagination, theme, circle }: MemberIndexProps) => {
	const { params } = usePageProps<'editCircleThemeMember'>()

	return (
		<IndexPageTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			navMenu={ getThemeMenu({ circle, theme }) }
			contextMenu={ {
				options: [
				// { label: 'Add Member', href: Routes.newThemeMember(theme.slug), icon: <NewIcon /> },
				],
			} }
		>
			<MembersTable />
		</IndexPageTemplate>
	)
}

export default MembersIndex
