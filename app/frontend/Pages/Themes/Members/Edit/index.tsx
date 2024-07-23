import React from 'react'
import { Section, Page } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditMemberProps {
	member: Schema.MembersEdit
	theme: Schema.ThemesShallow
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/:slug/edit
// @route: editCircleThemeMember
const EditMember = ({ member, theme }: EditMemberProps) => {
	const { params } = usePageProps<'editCircleThemeMember'>()

	const title = 'Edit Member'

	return (
		<Page title={ title }>
			<Section>
				<MembersForm
					method='put'
					to={ Routes.circleThemeMember(params.circle_slug, params.theme_slug, params.slug) }
					member={ member }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
