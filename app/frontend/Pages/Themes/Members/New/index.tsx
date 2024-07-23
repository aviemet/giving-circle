import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MemberForm from '../Form'

interface NewMemberProps {
	member: Schema.MembersFormData
	theme: Schema.ThemesShallow
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/new
// @route: newCircleThemeMember
const NewMember = ({ ...data }: NewMemberProps) => {
	const { params } = usePageProps<'newCircleThemeMember'>()
	const title = 'New Member'

	return (
		<Page title={ title }>
			<Section>
				<MemberForm
					to={ Routes.circleThemeMembers(params.circle_slug, params.theme_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMember
