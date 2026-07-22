import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { PresentationTable } from "@/domains/presentations/Table"
import { IndexTableTemplate } from "@/features"
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
	const { t } = useTranslation()
	const { params, active_circle, active_theme } = usePageProps<"themePresentations">()

	if(!active_circle || !active_theme) return <></>

	return (
		<Page
			title={ t("presentations.index.title") }
			breadcrumbs={ [
				{ title: t("presentations.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("presentations.index.breadcrumbs.themes"), href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: t("presentations.index.breadcrumbs.presentations"), href: window.location.href },
			] }
		>
			<IndexTableTemplate
				model="presentations"
				pagination={ pagination }
				contextMenu={ {
					options: [
						{
							label: t("presentations.index.newPresentation"),
							href: Routes.newThemePresentation(params.circle_slug, params.theme_slug),
							icon: <NewIcon />,
						},
					],
				} }
			>
				<PresentationTable
					records={ presentations }
					pagination={ pagination }
					model="presentations"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationsIndex
