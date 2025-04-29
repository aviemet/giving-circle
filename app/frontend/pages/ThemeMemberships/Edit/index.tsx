import React from 'react'
import { Section, Page } from '@/components'
import { Routes } from '@/lib'
import ThemeMembershipsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditThemeMembershipProps {
	membership: Schema.MembershipsEdit
}

// @path: /:circle_slug/themes/:theme_slug/memberships/:slug/edit
// @route: editThemeMembership
const EditThemeMembership = ({ membership }: EditThemeMembershipProps) => {
	const { params, active_circle, active_theme } = usePageProps<'editThemeMembership'>()

	if(!active_circle || !active_theme) return <></>

	const title = 'Edit Membership'

	return (
		<Page title={ title }>
			<Section>
				<ThemeMembershipsForm
					method='put'
					to={ Routes.themeMembership(params.circle_slug, params.theme_slug, params.slug) }
					membership={ membership }
					circle={ active_circle }
					theme={ active_theme }
				/>
			</Section>
		</Page>
	)
}

export default EditThemeMembership
