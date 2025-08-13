import { Group, Menu, Page, Section, Title } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowMembershipProps {
	membership: Schema.MembershipsShow
}

// @path: /:circle_slug/memberships/:slug
// @route: membership
const ShowMembership = ({ membership }: ShowMembershipProps) => {
	// copy @route above into the generic type assertion below
	const { params, active_circle } = usePageProps<"membership">()
	const title = membership.name || "Member"

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			heading={
				<Group>
					<Title>{ title }</Title>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editMembership(params.circle_slug, membership.slug) }>
								Edit Membership
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			}
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Members", href: Routes.circleMemberships(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>

			</Section>
		</Page>
	)
}

export default ShowMembership
