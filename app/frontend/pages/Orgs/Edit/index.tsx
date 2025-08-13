import { Page, Section } from "@/components"
import OrgsForm from "@/features/orgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditOrgProps {
	org: Schema.OrgsEdit
}

// @path: /:circle_slug/orgs/:slug/edit
// @route: editOrg
const EditOrg = ({ org }: EditOrgProps) => {
	const { params, active_circle } = usePageProps<"editOrg">()
	const title = "Edit Org"

	if(!active_circle) return <></>

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Circles", href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: "Organizations", href: Routes.circleOrgs(params.circle_slug) },
			{ title: org.name, href: Routes.org(params.circle_slug, org.slug) },
			{ title: "Edit", href: window.location.href },
		] }>
			<Section>
				<OrgsForm
					method="put"
					to={ Routes.org(params.circle_slug, org.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditOrg
