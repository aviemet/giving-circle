import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'
import { usePageProps } from '@/lib/hooks'

interface IOrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

const OrgsIndex = ({ orgs, pagination }: IOrgIndexProps) => {
	const { params } = usePageProps()

	return (
		<IndexPageTemplate
			title="Orgs"
			model="orgs"
			rows={ orgs }
			pagination={ pagination }
			deleteRoute={ Routes.adminCircleThemeOrgs(params.circle_slug, params.theme_slug) }
			menuOptions={ [
				{ label: 'New Org', href: Routes.newAdminCircleThemeOrg(params.circle_slug, params.theme_slug), icon: NewIcon },
			] }
		>
			<OrgsTable />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
