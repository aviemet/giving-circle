import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MemberForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewMemberProps {
	member: Schema.MembersFormData
}

const NewMember = ({ member }: NewMemberProps) => {
	const { circle, params } = usePageProps()
	const title = 'New Member'

	return (
		<Page title={ title } breadcrumbs={ (circle?.name && circle?.slug) ? [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(circle.slug) },
			{ title: 'Members', href: Routes.circleMembers(circle.slug) },
			{ title, href: Routes.newCircleMember(circle.slug) },
		] : [] }>

			<Section>
				<Title>{ title }</Title>

				{ /* <MemberForm
					to={ Routes.circleMembers(params.circle_slug) }
					member={ member }
				/> */ }
			</Section>

		</Page>
	)
}

export default NewMember
