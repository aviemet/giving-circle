import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import ThemeMembershipsTable from "@/features/themeMemberships/Table"
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
	const { params } = usePageProps<"themeMemberships">()

	return (
		<Page title="Memberships">
			<IndexTableTemplate
				model="memberships"
				rows={ memberships }
				pagination={ pagination }
				contextMenu={ {
					label: "Add Memberships to Theme",
					options: [
						{
							label: "Add New Membership To Theme",
							href: Routes.newThemeMembership(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
						{
							label: "Add Existing Member To Theme",
							href: Routes.newThemeMembership(params.circle_slug, params.theme_slug), icon: <NewIcon />,
						},
					// {
					// 	label: 'Import Members From File',
					// 	href: Routes.circleThemeMembersImport(params.circle_slug, params.theme_slug), icon: <NewIcon />,
					// },
					],
				} }
			>
				<ThemeMembershipsTable circle={ circle } theme={ theme } />
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemeMembersIndex
