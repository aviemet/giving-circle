import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { ThemeMembershipsTable } from "@/domains/themeMemberships/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface ThemeMemberIndexProps {
	memberships: Schema.MembershipsIndex[]
	pagination: Schema.Pagination
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/memberships
// @route: themeMemberships
const ThemeMembersIndex = ({ memberships, pagination, theme, circle }: ThemeMemberIndexProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themeMemberships">()

	return (
		<Page title={ t("theme_memberships.index.title") }>
			<IndexTableTemplate
				model="memberships"
				pagination={ pagination }
				contextMenu={ {
					label: t("theme_memberships.index.add_label"),
					options: [
						{
							label: t("theme_memberships.index.add_new"),
							href: Routes.newThemeMembership(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: t("theme_memberships.index.add_existing"),
							href: Routes.newThemeMembership(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
					],
				} }
			>
				<ThemeMembershipsTable
					circle={ circle }
					theme={ theme }
					records={ memberships }
					pagination={ pagination }
					model="memberships"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemeMembersIndex
