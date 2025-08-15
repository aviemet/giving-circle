import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import PresentationsTable from "@/features/presentations/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/presentations
// @route: themePresentations
const PresentationsIndex = ({ presentations, pagination, circle, theme }: PresentationIndexProps) => {
	const { params, active_circle, active_theme } = usePageProps<"themePresentations">()

	if(!active_circle || !active_theme) return <></>

	return (
		<Page
			title="Presentations"
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Themes", href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: "Presentations", href: window.location.href },
			] }
		>
			<IndexTableTemplate
				model="presentations"
				rows={ presentations }
				pagination={ pagination }
				contextMenu={ {
					options: [
						{ label: "New Presentation", href: Routes.newThemePresentation(params.circle_slug, params.theme_slug), icon: <NewIcon /> },
					],
				} }
			>
				<PresentationsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationsIndex
