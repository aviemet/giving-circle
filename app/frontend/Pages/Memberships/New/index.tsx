import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MemberForm from '../Form'

interface NewMemberProps {
	member: Schema.MembersFormData
}

const NewMember = ({ ...data }: NewMemberProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'New Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Members', href: Routes.members() },
			{ title: 'New Member', href: window.location.href },
		] }>

			<Section>
				<MemberForm
					to={ Routes.members() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMember
