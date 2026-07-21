import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { OrgForm } from "@/domains/orgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditOrgProps {
	org: Schema.OrgsEdit
}

// @path: /:circle_slug/orgs/:slug/edit
// @route: editOrg
const EditOrg = ({ org }: EditOrgProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editOrg">()
	const title = t("orgs.edit.title")

	if(!active_circle) return <></>

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("orgs.index.breadcrumbs.circles"), href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: t("orgs.index.breadcrumbs.orgs"), href: Routes.circleOrgs(params.circle_slug) },
			{ title: org.name, href: Routes.org(params.circle_slug, org.slug) },
			{ title: t("common.actions.edit_breadcrumb"), href: window.location.href },
		] }>
			<Section>
				<OrgForm
					method="put"
					to={ Routes.org(params.circle_slug, org.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditOrg
