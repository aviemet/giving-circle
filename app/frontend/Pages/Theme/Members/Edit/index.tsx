import React from 'react'
import { Heading, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'

interface EditMemberProps {
	member: Schema.Member
}

const EditMember = ({ member }: EditMemberProps) => {
	const title = 'Edit Member'

	return (
		<Section>
			<Heading>{ title }</Heading>

			<MembersForm
				method='put'
				to={ Routes.member(member.slug) }
				member={ member }
			/>
		</Section>
	)
}

export default EditMember
