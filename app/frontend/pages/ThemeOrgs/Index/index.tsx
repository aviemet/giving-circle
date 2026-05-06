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
	const { params } = usePageProps<"themeOrgs">()

	return (
		<Page title="Theme Organizations">
			<IndexTableTemplate
				model="theme_orgs"
				pagination={ pagination }
				contextMenu={ {
					label: "Add Orgs to Theme",
					options: [
						{
							label: "Add New Org To Theme",
							href: Routes.newThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: "Add Existing Org To Theme",
							href: Routes.newThemeOrg(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: "Import Orgs From File",
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
