import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import MembersTable from '../Table'

interface IMemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
}

const MembersIndex = ({ members, pagination }: IMemberIndexProps) => {
	return (
		<IndexPageTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			// menuOptions={ [
			// 	{ label: 'New Member', href: Routes.newCircleMember(), icon: NewIcon },
			// ] }
		>
			<MembersTable />
		</IndexPageTemplate>
	)
}

export default MembersIndex
