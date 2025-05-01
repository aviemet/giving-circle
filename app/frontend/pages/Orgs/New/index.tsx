import { Title, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import OrgForm from "../Form"

interface NewOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/orgs/new
// @route: newCircleOrg
const NewOrg = ({ org }: NewOrgProps) => {
	const { params } = usePageProps<"newCircleOrg">()
	const title = "New Org"

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgForm
					to={ Routes.circleOrgs(params.circle_slug) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
