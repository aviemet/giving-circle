import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { OrgForm } from "@/domains/orgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/orgs/new
// @route: newCircleOrg
const NewOrg = ({ org }: NewOrgProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"newCircleOrg">()
	const title = t("orgs.new.title")

	if(!active_circle) return <></>

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("orgs.index.breadcrumbs.circles"), href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: t("orgs.index.breadcrumbs.orgs"), href: Routes.circleOrgs(params.circle_slug) },
			{ title: t("common.actions.new"), href: window.location.href },
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
