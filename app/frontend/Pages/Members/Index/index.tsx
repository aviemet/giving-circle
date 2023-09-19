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
			deleteRoute={ Routes.members() }
			menuOptions={ [
				{ label: 'New Member', href: Routes.newMember(), icon: NewIcon },
			] }
		>
			<MembersTable />
		</IndexPageTemplate>
	)
}

export default MembersIndex
