import { Group, Title, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowOrgProps {
	org: Schema.OrgsShow
}

// @path: /:circle_slug/orgs/:slug
// @route: org
const ShowOrg = ({ org }: ShowOrgProps) => {
	const { params, active_circle } = usePageProps<"org">()
	const title = org?.name || "Organization"

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			heading={ <Group>
				<Title>{ title }</Title>
				<Menu position="bottom-end">
					<Menu.Target />
					<Menu.Dropdown>
						<Menu.Link
							href={ Routes.editOrg(params.circle_slug, org.slug) }
						>
							Edit Org
						</Menu.Link>
					</Menu.Dropdown>
				</Menu>
			</Group> }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Organizations", href: Routes.circleOrgs(params.circle_slug) },
				{ title: org.name, href: Routes.org(params.circle_slug, org.slug) },
				{ title: "Edit", href: window.location.href },
			] }
		>
			<Section>


			</Section>
		</Page>
	)
}

export default ShowOrg
