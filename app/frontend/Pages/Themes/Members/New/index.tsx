import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MemberForm from '../Form'

interface NewMemberProps {
	member: Schema.MembersFormData
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/new
// @route: newCircleThemeMember
const NewMember = ({ ...data }: NewMemberProps) => {
	const { params } = usePageProps<'newCircleThemeMember'>()
	const title = 'New Member'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<MemberForm
					to={ Routes.circleMembers(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMember
