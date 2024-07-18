import React from 'react'
import { Title, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'

interface EditMemberProps {
	member: Schema.MembersEdit
	circle: Schema.CirclesShare
}

const EditMember = ({ member, circle }: EditMemberProps) => {
	const title = 'Edit Member'

	return (
		<Section>
			<Title>{ title }</Title>

			<MembersForm
				method='put'
				to={ Routes.circleMember(circle.id, member.slug) }
				member={ member }
			/>
		</Section>
	)
}

export default EditMember