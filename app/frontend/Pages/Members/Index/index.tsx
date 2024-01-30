import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'
import { usePageProps } from '@/lib/hooks'

interface IMemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
}

const MembersIndex = ({ members, pagination }: IMemberIndexProps) => {
	const { params } = usePageProps()
	console.log({ params })
	return (
		<IndexPageTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			deleteRoute={ Routes.circleMembers(params.circle_slug) }
			menuOptions={ [
				{ label: 'New Member', href: Routes.newCircleMember(params.circle_slug), icon: NewIcon },
			] }
		>
			<MembersTable />
		</IndexPageTemplate>
	)
}

export default MembersIndex
