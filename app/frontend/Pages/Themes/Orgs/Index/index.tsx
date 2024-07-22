import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import { usePageProps } from '@/lib/hooks'

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesShallow
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/themes/:theme_slug/orgs
// @route: circleThemeOrgs
const OrgsIndex = ({ orgs, pagination, theme, circle }: OrgIndexProps) => {
	const { params } = usePageProps<'circleThemeOrgIndex'>()

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
						href: Routes.newCircleThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					},
					{
						label: 'Add Existing Org To Theme',
						href: Routes.newCircleThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					},
					{
						label: 'Import Orgs From File',
						href: Routes.circleThemeOrgsImport(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					},
				],
			} }
		>
			<OrgsTable theme={ theme } />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
