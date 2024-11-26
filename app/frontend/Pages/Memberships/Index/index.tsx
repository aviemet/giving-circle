import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import MembershipsTable from '../Table'

interface MembershipIndexProps {
	memberships: Schema.MembershipsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/memberships
// @route: circleMemberships
const MembershipsIndex = ({ memberships, pagination }: MembershipIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params, active_circle } = usePageProps<'circleMemberships'>()
	const title = active_circle ? `${active_circle.name} Memberships` : 'Memberships'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
			</> }
		>
			<IndexTableTemplate
				model="memberships"
				rows={ memberships }
				pagination={ pagination }
				contextMenu={
					{
						options: [
							{
								label: 'New Membership',
								href: Routes.newCircleMembership(params.circle_slug),
								icon: <NewIcon />,
							},
						],
						deleteRoute: Routes.circleMemberships(params.circle_slug),
					}
				}
			>
				{ active_circle && <MembershipsTable circle={ active_circle } /> }
			</IndexTableTemplate>
		</Page>
	)
}

export default MembershipsIndex
