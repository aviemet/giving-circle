import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditMemberProps {
	member: Schema.MembersEdit
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/members/:slug/edit
// @route: editCircleMember
const EditMember = ({ member, circle }: EditMemberProps) => {
	const { params } = usePageProps<'editCircleMember'>()
	const title = `Edit ${member?.name || 'Member'}`

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title: 'Members', href: Routes.circleMembers(params.circle_slug) },
			{ title: member.name, href: Routes.circleMember(params.circle_slug, member.slug) },
			{ title: 'Edit Member', href: Routes.editCircleMember(params.circle_slug, member.slug) },
		] }>
			<Section>
				<Title>{ title }</Title>

				<MembersForm
					method='put'
					to={ Routes.circleMember(params.circle_slug, params.slug) }
					member={ member }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
