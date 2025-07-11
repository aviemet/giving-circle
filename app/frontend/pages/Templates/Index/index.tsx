import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import TemplatesTable from "@/features/templates/Table"
import { Routes } from "@/lib"


interface TemplateIndexProps {
	templates: Schema.PresentationTemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/presentation_templates
// @route: circlePresentationTemplates
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
			// 	deleteRoute: Routes.circlePresentationTemplates(circle.slug),
			// 	options: [
			// 		{ label: 'New Template', href: Routes.newCirclePresentationTemplate(circle.slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<TemplatesTable circle={ circle } />
			</IndexTableTemplate>
		</Page>
	)
}

export default TemplatesIndex
