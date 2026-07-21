import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { MembershipForm } from "@/domains/memberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditMembershipProps {
	membership: Schema.MembershipsEdit
}

// @path: /:circle_slug/memberships/:slug/edit
// @route: editMembership
const EditMember = ({ membership }: EditMembershipProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editMembership">()
	const title = t("memberships.edit.title")

	if(!active_circle) return <></>

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("memberships.index.breadcrumbs.circles"), href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: t("memberships.index.breadcrumbs.members"), href: Routes.circleMemberships(params.circle_slug) },
			{ title: membership.name, href: Routes.membership(params.circle_slug, membership.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<MembershipForm
					method="put"
					to={ Routes.membership(params.circle_slug, membership.slug) }
					membership={ membership }
				/>
			</Section>
		</Page>
	)
}

export default EditMember
