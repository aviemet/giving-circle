import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface IMemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesShallow
	circle: Schema.CirclesShare
}

const MembersIndex = ({ members, pagination, theme, circle }: IMemberIndexProps) => {
	return (
		<IndexPageTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			navMenu={ getThemeMenu({ circle: circle, theme }) }
			menuOptions={ [
				{ label: 'Add Member', href: Routes.newThemeMember(theme.slug), icon: NewIcon },
			] }
		>
			<MembersTable />
		</IndexPageTemplate>
	)
}

export default MembersIndex
