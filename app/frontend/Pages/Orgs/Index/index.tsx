import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'
import { usePageProps } from '@/lib/hooks'

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

const OrgsIndex = ({ orgs, pagination }: OrgIndexProps) => {
	const { params } = usePageProps()

	return (
		<IndexPageTemplate
			title="Orgs"
			model="orgs"
			rows={ orgs }
			pagination={ pagination }
			menuOptions={ [
				{
					label: 'New Org',
					href: Routes.newThemeOrg(params.theme_slug), icon: NewIcon,
				},
			] }
		>
			<OrgsTable />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
