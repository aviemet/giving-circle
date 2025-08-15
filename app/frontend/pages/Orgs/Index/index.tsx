import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import OrgsTable from "@/features/orgs/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/orgs
// @route: circleOrgs
const OrgsIndex = ({ orgs, pagination }: OrgIndexProps) => {
	const { params, active_circle } = usePageProps<"circleOrgs">()

	if(!active_circle) return <></>

	return (
		<Page title="Orgs" breadcrumbs={ [
			{ title: "Circles", href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: "Organizations", href: Routes.circleOrgs(params.circle_slug) },
		] }>
			<IndexTableTemplate
				model="orgs"
				rows={ orgs }
				pagination={ pagination }
				contextMenu={ {
					options: [
						{
							label: "New Org",
							href: Routes.newCircleOrg(params.circle_slug),
							icon: <NewIcon />,
						},
					],
				} }
			>
				<OrgsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default OrgsIndex
