import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MembersForm from '../Form'

interface EditMemberProps {
	member: Schema.MembersEdit
}

const EditMember = ({ member }: EditMemberProps) => {
	const { circle } = usePageProps()
	const title = `Edit ${member?.name || 'Member'}`

	return (
		<Page title={ title } breadcrumbs={ (circle?.name && circle?.slug) ? [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(circle.slug) },
			{ title: 'Members', href: Routes.circleMembers(circle.slug) },
			{ title: member.name, href: Routes.member(member.slug) },
			{ title: 'Edit Member', href: Routes.editMember(member.slug) },
		] : [] }>
			<Section>
				<Heading>{ title }</Heading>

				<MembersForm
					method='put'
					to={ Routes.member(member.slug) }
					member={ member }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
