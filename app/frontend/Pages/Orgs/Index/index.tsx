import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

const OrgsIndex = ({ orgs, pagination, circle }: OrgIndexProps) => {
	return (
		<IndexPageTemplate
			title="Orgs"
			model="orgs"
			rows={ orgs }
			pagination={ pagination }
			contextMenu={ {
				options: [
					{
						label: 'New Org',
						href: Routes.newCircleOrg(circle.slug),
						icon: <NewIcon />,
					},
				],
			} }
		>
			<OrgsTable />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
