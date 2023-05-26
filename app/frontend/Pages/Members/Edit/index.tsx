import React from 'react'
import { Heading, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'

interface IEditMemberProps {
	member: Schema.Member
}

const EditMember = ({ member }: IEditMemberProps) => {
	const title = 'Edit Member'

	return (
		<Section>
			<Heading>{ title }</Heading>
			
			<MembersForm
				method='put'
				to={ Routes.member() }
				member={ member }
			/>
		</Section>
	)
}

export default EditMember
