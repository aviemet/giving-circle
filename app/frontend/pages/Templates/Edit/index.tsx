import { Page, Section } from "@/components"
import TemplatesForm from "@/features/templates/Form"
import { Routes } from "@/lib"


interface EditTemplateProps {
	template: Schema.TemplatesEdit
}

// @path: /:circle_slug/templates/:slug/edit
// @route: editCircleTemplate
const EditTemplate = ({ template }: EditTemplateProps) => {
	const title = "Edit Template"

	return (
		<Page title={ title }>
			<Section>
				<TemplatesForm
					method="put"
					to={ Routes.circleTemplate(template.circle.slug, template.slug) }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
