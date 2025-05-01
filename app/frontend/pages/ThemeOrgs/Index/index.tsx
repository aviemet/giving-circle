import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import OrgsTable from "../Table"

interface OrgIndexProps {
	orgs: Schema.OrgsIndex[]
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
				rows={ orgs }
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
				<OrgsTable theme={ theme } circle={ circle } />
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemeOrgsIndex
