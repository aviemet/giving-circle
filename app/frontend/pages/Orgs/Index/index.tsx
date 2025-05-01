import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import OrgsTable from "../Table"

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/orgs
// @route: circleOrgs
const OrgsIndex = ({ orgs, pagination }: OrgIndexProps) => {
	const { params } = usePageProps<"circleOrgs">()

	return (
		<Page title="Orgs" >
			<IndexTableTemplate
				model="orgs"
				rows={ orgs }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{
			// 			label: 'New Org',
			// 			href: Routes.newCircleOrg(params.circle_slug),
			// 			icon: <NewIcon />,
			// 		},
			// 	],
			// } }
			>
				<OrgsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default OrgsIndex
