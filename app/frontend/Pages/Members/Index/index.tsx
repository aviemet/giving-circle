import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'
import { Page } from '@/Components'

interface MemberIndexProps {
	members: Schema.MembersIndex[]
	circle: Schema.CirclesInertiaShare
	pagination: Schema.Pagination
}

const MembersIndex = ({ members, circle, pagination }: MemberIndexProps) => {
	return (
		<Page
			title={ `${circle.name} Members` }
			breadcrumbs={ [
				{ title: 'Circles', href: Routes.circles() },
				{ title: circle.name, href: Routes.circle(circle.slug) },
				{ title: 'Members', href: Routes.circleMembers(circle?.slug) },
			] }
		>
			<IndexTableTemplate
				model="members"
				rows={ members }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{ label: 'New Member', href: Routes.newCircleMember(circle.slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<MembersTable circle={ circle } />
			</IndexTableTemplate>
		</Page>
	)
}

export default MembersIndex
