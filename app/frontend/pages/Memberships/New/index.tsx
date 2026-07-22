import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { MembershipForm } from "@/domains/memberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewMembershipProps {
	membership: Schema.MembershipsFormData
}

// @path: /:circle_slug/memberships/new
// @route: newCircleMembership
const NewMembership = ({ ...data }: NewMembershipProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"newCircleMembership">()

	if(!active_circle) return <></>

	const title = t("memberships.new.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("memberships.index.breadcrumbs.circles"), href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: t("memberships.index.breadcrumbs.members"), href: Routes.circleMemberships(params.circle_slug) },
			{ title, href: window.location.href },
		] }>

			<Section>
				<MembershipForm
					to={ Routes.circleMemberships(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMembership
