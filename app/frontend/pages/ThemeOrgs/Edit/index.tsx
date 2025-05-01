import { Title, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import OrgsForm from "../Form"

interface EditOrgProps {
	org: Schema.OrgsEdit
}

// @path: /:circle_slug/themes/:theme_slug/orgs/:slug/edit
// @route: editThemeOrg
const EditThemeOrg = ({ org }: EditOrgProps) => {
	const { params } = usePageProps<"editThemeOrg">()

	const title = `Edit: ${org.name || "Org"}`

	return (
		<Page title={ title }>
			<Section>
				<OrgsForm
					method="put"
					to={ Routes.editThemeOrg(params.circle_slug, params.theme_slug, params.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditThemeOrg
