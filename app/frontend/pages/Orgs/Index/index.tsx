import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { OrgTable } from "@/domains/orgs/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/orgs
// @route: circleOrgs
const OrgsIndex = ({ orgs, pagination }: OrgIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"circleOrgs">()

	if(!active_circle) return <></>

	return (
		<Page title={ t("orgs.index.title") } breadcrumbs={ [
			{ title: t("orgs.index.breadcrumbs.circles"), href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: t("orgs.index.breadcrumbs.orgs"), href: Routes.circleOrgs(params.circle_slug) },
		] }>
			<IndexTableTemplate
				model="orgs"
				pagination={ pagination }
				contextMenu={ {
					options: [
						{
							label: t("orgs.index.newOrg"),
							href: Routes.newCircleOrg(params.circle_slug),
							icon: <NewIcon />,
						},
					],
				} }
			>
				<OrgTable records={ orgs } pagination={ pagination } model="orgs" />
			</IndexTableTemplate>
		</Page>
	)
}

export default OrgsIndex
