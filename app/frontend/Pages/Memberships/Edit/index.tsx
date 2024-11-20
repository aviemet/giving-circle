import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MembersForm from '../Form'

interface EditMemberProps {
	member: Schema.MembersEdit
}

const EditMember = ({ member }: EditMemberProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Members', href: Routes.members() },
			{ title: "Member", href: Routes.member(member.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<MembersForm
					method='put'
					to={ Routes.member() }
					member={ member }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
