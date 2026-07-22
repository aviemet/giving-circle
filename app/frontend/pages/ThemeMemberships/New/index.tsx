import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { ThemeMemberForm } from "@/domains/themeMemberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewThemeMemberProps {
	member: Schema.MembershipsFormData
	theme: Schema.ThemesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/memberships/new
// @route: newThemeMembership
const NewThemeMember = ({ member, theme }: NewThemeMemberProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps()
	const title = t("theme_memberships.new.title")

	if(!active_circle) return <></>

	return (
		<Page title={ title }>
			<Section>
				<ThemeMemberForm
					to={ Routes.circleThemeMembers(params.circle_slug, params.theme_slug) }
					membership={ member }
					circle={ active_circle }
					theme={ theme }
				/>
			</Section>

		</Page>
	)
}

export default NewThemeMember
