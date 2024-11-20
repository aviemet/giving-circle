import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import MembersTable from '../Table'

interface MemberIndexProps {
	members: Schema.MembersIndex[]
	pagination: Schema.Pagination
}

const MembersIndex = ({ members, pagination }: MemberIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = Member

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newMember() } icon={ <NewIcon /> }>
						New Member
					</Menu.Link>
				</Menu>
			</> }
		>
		<IndexTableTemplate
			title="Members"
			model="members"
			rows={ members }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.members(),
				[
					{ label: 'New Member', href: Routes.newMember(), icon: NewIcon },
				]
			} }
		>
			<MembersTable />
		</IndexTableTemplate>
		</Page>
	)
}

export default MembersIndex
