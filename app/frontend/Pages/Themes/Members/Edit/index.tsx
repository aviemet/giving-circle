import React from 'react'
import { Title, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditMemberProps {
	member: Schema.MembersEdit
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/:slug/edit
// @route: editCircleThemeMember
const EditMember = ({ member }: EditMemberProps) => {
	const { params } = usePageProps<'editCircleThemeMember'>()

	const title = 'Edit Member'

	return (
		<Section>
			<Title>{ title }</Title>

			<MembersForm
				method='put'
				to={ Routes.circleMember(params.circle_slug, params.slug) }
				member={ member }
			/>
		</Section>
	)
}

export default EditMember
