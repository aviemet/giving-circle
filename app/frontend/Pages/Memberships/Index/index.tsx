import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
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
	const title = active_circle ? `${active_circle} Memberships` : 'Memberships'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newCircleMembership(params.circle_slug) } icon={ <NewIcon /> }>
						New Membership
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				model="memberships"
				rows={ memberships }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.memberships(),
			// 	[
			// 		{ label: 'New Membership', href: Routes.newMembership(), icon: NewIcon },
			// 	]
			// } }
			>
				<MembershipsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default MembershipsIndex
