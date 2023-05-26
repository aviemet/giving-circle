import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MemberForm from '../Form'

interface INewMemberProps {
	member: Schema.MembersFormData
}

const NewMember = ({ ...data }: INewMemberProps) => {
	const title = 'New Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Members', href: Routes.members() },
			{ title: 'New Member' },
		] }>

			<Section>
				<Heading>{ title }</Heading>

				<MemberForm
					to={ Routes.members() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMember
