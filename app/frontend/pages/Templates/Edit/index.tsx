import { Page, Section } from "@/components"
import TemplatesForm from "@/features/templates/Form"
import { Routes } from "@/lib"


interface EditTemplateProps {
	template: Schema.PresentationTemplatesEdit
}

// @path: /:circle_slug/presentation_templates/:slug/edit
// @route: editCirclePresentationTemplate
const EditTemplate = ({ template }: EditTemplateProps) => {
	const title = "Edit Template"

	return (
		<Page title={ title }>
			<Section>
				<TemplatesForm
					method="put"
					to={ Routes.circlePresentationTemplate(template.circle.slug, template.slug) }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
