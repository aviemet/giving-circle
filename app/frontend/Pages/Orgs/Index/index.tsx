import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'
import { usePageProps } from '@/lib/hooks'
import { Page } from '@/Components'

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/orgs
// @route: circleOrgs
const OrgsIndex = ({ orgs, pagination }: OrgIndexProps) => {
	const { params } = usePageProps<'circleOrgs'>()

	return (
		<Page
			title="Orgs"
		>
			<IndexTableTemplate
				model="orgs"
				rows={ orgs }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{
			// 			label: 'New Org',
			// 			href: Routes.newCircleOrg(params.circle_slug),
			// 			icon: <NewIcon />,
			// 		},
			// 	],
			// } }
			>
				<OrgsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default OrgsIndex
