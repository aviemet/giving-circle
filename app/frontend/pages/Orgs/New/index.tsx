import { Title, Page, Section } from "@/components"
import OrgForm from "@/features/orgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/orgs/new
// @route: newCircleOrg
const NewOrg = ({ org }: NewOrgProps) => {
	const { params, active_circle } = usePageProps<"newCircleOrg">()
	const title = "New Organization"

	if(!active_circle) return <></>

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Circles", href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: "Organizations", href: Routes.circleOrgs(params.circle_slug) },
			{ title: "New", href: window.location.href },
		] }>
			<Section>
				<OrgForm
					to={ Routes.circleOrgs(params.circle_slug) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
