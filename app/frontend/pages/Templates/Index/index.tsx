import { useTranslation } from "react-i18next"

import { Page, Text } from "@/components"
import { NewIcon } from "@/components/Icons"
import { TemplatesTable } from "@/domains/templates/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface TemplateIndexProps {
	templates: Schema.TemplatesIndex[]
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/templates
// @route: circleTemplates
const TemplatesIndex = ({ templates, themes, pagination, circle }: TemplateIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"circleTemplates">()

	if(!active_circle) return <></>

	return (
		<Page
			title={ t("templates.index.title") }
			breadcrumbs={ [
				{ title: t("templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("templates.index.breadcrumbs.templates"), href: Routes.circleTemplates(params.circle_slug) },
			] }
		>
			<Text size="sm" c="dimmed" mb="md">
				{ t("templates.index.helperText") }
			</Text>
			<IndexTableTemplate
				model="templates"
				pagination={ pagination }
				contextMenu={ {
					deleteRoute: Routes.circleTemplates(circle.slug),
					options: [
						{ label: t("templates.index.newTemplate"), href: Routes.newCircleTemplate(circle.slug), icon: <NewIcon /> },
					],
				} }
			>
				<TemplatesTable
					circle={ circle }
					themes={ themes }
					records={ templates }
					pagination={ pagination }
					model="templates"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default TemplatesIndex
