import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'
import { getCircleMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface MemberIndexProps {
	members: Schema.MembersIndex[]
	circle: Schema.CirclesShare
	pagination: Schema.Pagination
}

const MembersIndex = ({ members, circle, pagination }: MemberIndexProps) => {
	return (
		<IndexPageTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			navMenu={ getCircleMenu({ circle }) }
			breadcrumbs={ [
				{ title: 'Circles', href: Routes.circles() },
				{ title: circle.name, href: Routes.circle(circle.slug) },
				{ title: 'Members', href: Routes.circleMembers(circle?.slug) },
			] }
			// menuOptions={ [
			// 	{ label: 'New Member', href: Routes.newCircleMember(circle.slug), icon: NewIcon },
			// ] }
		>
			<MembersTable circle={ circle } />
		</IndexPageTemplate>
	)
}

export default MembersIndex
