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
			model="theme_orgs"
			rows={ orgs }
			pagination={ pagination }
			navMenu={ getThemeMenu({ circle: circle, theme }) }
			contextMenu={ {
				label: 'Add Orgs to Theme',
				options: [
					{
						label: 'Add New Org To Theme',
						href: Routes.newCircleThemeOrg(circle.slug, theme.slug), icon: <NewIcon />,
					},
					{
						label: 'Add Existing Org To Theme',
						href: Routes.newCircleThemeOrg(circle.slug, theme.slug), icon: <NewIcon />,
					},
					{
						label: 'Import Orgs From File',
						href: Routes.circleThemeOrgsImport(circle.slug, theme.slug), icon: <NewIcon />,
					},
				],
			} }
		>
			<OrgsTable theme={ theme } />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
