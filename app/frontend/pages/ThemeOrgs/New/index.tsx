import { useTranslation } from "react-i18next"

import { Title, Page, Section } from "@/components"
import { ThemeOrgForm } from "@/domains/themeOrgs/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewThemeOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/themes/:theme_slug/orgs/new
// @route: newThemeOrg
const NewThemeOrg = ({ org }: NewThemeOrgProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"newThemeOrg">()
	const title = t("theme_orgs.new.title")

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<ThemeOrgForm
					to={ Routes.themeOrgs(params.circle_slug, params.theme_slug) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewThemeOrg
