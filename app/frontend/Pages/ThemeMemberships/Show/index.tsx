import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowThemeMembershipProps {
	membership: Schema.MembershipsShow
}

// @path: /:circle_slug/themes/:theme_slug/memberships/:slug
// @route: themeMembership
const ShowThemeMembership = ({ membership }: ShowThemeMembershipProps) => {
	const { params, active_circle, active_theme } = usePageProps<'themeMembership'>()
	const title = membership?.name || 'Membership'

	if(!active_circle || !active_theme) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: 'Circles', href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: 'Themes', href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme?.name || "Current Theme", href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: 'Memberships', href: Routes.themeMemberships(params.circle_slug, params.theme_slug) },
				{ title, href: Routes.themeMembership(params.circle_slug, params.theme_slug, membership.slug) },
			] }
		>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editThemeMembership(params.circle_slug, params.theme_slug, params.slug) }>
								Edit Membership
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>


			</Section>
		</Page>
	)
}

export default ShowThemeMembership
