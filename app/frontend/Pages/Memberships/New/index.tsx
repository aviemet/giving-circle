import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import MembershipForm from '../Form'

interface NewMembershipProps {
	membership: Schema.MembershipsFormData
}

// @path: /:circle_slug/memberships/new
// @route: newCircleMembership
const NewMembership = ({ ...data }: NewMembershipProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<'newCircleMembership'>()
	const title = 'New Membership'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Memberships', href: Routes.circleMemberships(params.circle_slug) },
			{ title: 'New Membership', href: window.location.href },
		] }>

			<Section>
				<MembershipForm
					to={ Routes.circleMemberships(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMembership
