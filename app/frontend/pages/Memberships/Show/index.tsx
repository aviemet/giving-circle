import React from "react"

import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowMembershipProps {
	membership: Schema.MembershipsShow
}

// @path: /:circle_slug/memberships/:slug
// @route: membership
const ShowMembership = ({ membership }: ShowMembershipProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"membership">()
	const title = membership.name || "Membership"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Membership", href: Routes.circleMemberships(params.circle_slug) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editMembership(params.circle_slug, membership.slug) }>
								Edit Membership
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowMembership
