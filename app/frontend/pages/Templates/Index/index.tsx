import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { TemplatesTable } from "@/domains/templates/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface TemplateIndexProps {
	templates: Schema.TemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/templates
// @route: circleTemplates
const TemplatesIndex = ({ templates, pagination, circle }: TemplateIndexProps) => {
	const { params, active_circle } = usePageProps<"circleTemplates">()

	if(!active_circle) return <></>

	return (
		<Page
			title="Templates"
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Templates", href: Routes.circleTemplates(params.circle_slug) },
			] }
		>
			<IndexTableTemplate
				model="templates"
				pagination={ pagination }
				contextMenu={ {
					deleteRoute: Routes.circleTemplates(circle.slug),
					options: [
						{ label: "New Template", href: Routes.newCircleTemplate(circle.slug), icon: <NewIcon /> },
					],
				} }
			>
				<TemplatesTable
					circle={ circle }
					records={ templates }
					pagination={ pagination }
					model="templates"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default TemplatesIndex
