import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import TemplatesTable from "@/features/templates/Table"
import { Routes } from "@/lib"


interface TemplateIndexProps {
	templates: Schema.TemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/templates
// @route: circleTemplates
const TemplatesIndex = ({ templates, pagination, circle }: TemplateIndexProps) => {
	return (
		<Page
			title="Templates"
		>
			<IndexTableTemplate
				model="templates"
				rows={ templates }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.circleTemplates(circle.slug),
			// 	options: [
			// 		{ label: 'New Template', href: Routes.newCircleTemplate(circle.slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<TemplatesTable circle={ circle } />
			</IndexTableTemplate>
		</Page>
	)
}

export default TemplatesIndex
