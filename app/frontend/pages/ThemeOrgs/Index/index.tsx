import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { ThemeOrgTable } from "@/domains/themeOrgs/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface OrgIndexProps {
	orgs: Schema.ThemesOrgsShow[]
	pagination: Schema.Pagination
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/orgs
// @route: themeOrgs
const ThemeOrgsIndex = ({ orgs, pagination, theme, circle }: OrgIndexProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themeOrgs">()

	return (
		<Page title={ t("theme_orgs.index.title") }>
			<IndexTableTemplate
				model="theme_orgs"
				pagination={ pagination }
				contextMenu={ {
					label: t("theme_orgs.index.add_label"),
					options: [
						{
							label: t("theme_orgs.index.add_new"),
							href: Routes.newThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: t("theme_orgs.index.add_existing"),
							href: Routes.newThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: t("theme_orgs.index.import_from_file"),
							href: Routes.themeOrgsImport(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
					],
				} }
			>
				<ThemeOrgTable
					theme={ theme }
					circle={ circle }
					records={ orgs }
					pagination={ pagination }
					model="theme_orgs"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemeOrgsIndex
