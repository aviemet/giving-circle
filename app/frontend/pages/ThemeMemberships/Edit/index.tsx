import { useTranslation } from "react-i18next"

import { Section, Page } from "@/components"
import { ThemeMemberForm } from "@/domains/themeMemberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditThemeMembershipProps {
	membership: Schema.MembershipsEdit
}

// @path: /:circle_slug/themes/:theme_slug/memberships/:slug/edit
// @route: editThemeMembership
const EditThemeMembership = ({ membership }: EditThemeMembershipProps) => {
	const { t } = useTranslation()
	const { params, active_circle, active_theme } = usePageProps<"editThemeMembership">()

	if(!active_circle || !active_theme) return <></>

	const title = t("theme_memberships.edit.title")

	return (
		<Page title={ title }>
			<Section>
				<ThemeMemberForm
					method="put"
					to={ Routes.themeMembership(params.circle_slug, params.theme_slug, params.slug) }
					membership={ membership }
					circle={ active_circle }
					theme={ active_theme }
				/>
			</Section>
		</Page>
	)
}

export default EditThemeMembership
