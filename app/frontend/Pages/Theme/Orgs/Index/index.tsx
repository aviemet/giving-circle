import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesShallow
	circle: Schema.CirclesShare
}

const OrgsIndex = ({ orgs, pagination, theme, circle }: OrgIndexProps) => {
	return (
		<IndexPageTemplate
			title="Orgs"
			model="orgs"
			rows={ orgs }
			pagination={ pagination }
			navMenu={ getThemeMenu({ circle: circle, theme }) }
			menuOptions={ [
				{
					label: 'Add Org To Theme',
					href: Routes.newThemeOrg(theme.slug), icon: NewIcon,
				},
			] }
		>
			<OrgsTable />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
