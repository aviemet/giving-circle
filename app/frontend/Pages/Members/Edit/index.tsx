import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MembersForm from '../Form'

interface EditMemberProps {
	member: Schema.MembersEdit
	circle: Schema.CirclesShare
}

const EditMember = ({ member, circle }: EditMemberProps) => {
	const title = `Edit ${member?.name || 'Member'}`

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(circle.slug) },
			{ title: 'Members', href: Routes.circleMembers(circle.slug) },
			{ title: member.name, href: Routes.circleMember(circle.slug, member.slug) },
			{ title: 'Edit Member', href: Routes.editCircleMember(circle.slug, member.slug) },
		] }>
			<Section>
				<Title>{ title }</Title>

				<MembersForm
					method='put'
					to={ Routes.circleMember(circle.slug, member.slug) }
					member={ member }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
