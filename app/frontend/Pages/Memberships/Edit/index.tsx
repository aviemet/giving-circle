import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MembershipForm from '../Form'

interface EditMembershipProps {
	membership: Schema.MembershipsEdit
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/memberships/:slug/edit
// @route: editMembership
const EditMember = ({ membership, circle }: EditMembershipProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<'editMembership'>()
	const title = 'Edit Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title: 'Members', href: Routes.circleMemberships(params.circle_slug) },
			{ title: membership.name, href: Routes.membership(params.circle_slug, membership.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<MembershipForm
					method='put'
					to={ Routes.membership(params.circle_slug, membership.slug) }
					membership={ membership }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
