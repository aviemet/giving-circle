import { Title, Page, Section } from "@/components"
import OrgsForm from "@/features/orgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditOrgProps {
	org: Schema.OrgsEdit
}

// @path: /:circle_slug/orgs/:slug/edit
// @route: editOrg
const EditOrg = ({ org }: EditOrgProps) => {
	const { params } = usePageProps<"editOrg">()
	const title = "Edit Org"

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

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
