import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MemberForm from '../Form'

interface NewMemberProps {
	member: Schema.MembersFormData
	circle: Schema.CirclesPersisted
}

// @path: /circles/:circle_slug/members/new
// @route: newCircleMember
const NewMember = ({ member, circle }: NewMemberProps) => {
	const { params } = usePageProps<'newCircleMember'>()
	const title = 'New Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title: 'Members', href: Routes.circleMembers(params.circle_slug) },
			{ title, href: Routes.newCircleMember(params.circle_slug) },
		] }>
			<Section>
				<Title>{ title }</Title>

				<MemberForm
					to={ Routes.circleMembers(params.circle_slug) }
					member={ member }
				/>
			</Section>

		</Page>
	)
}

export default NewMember
