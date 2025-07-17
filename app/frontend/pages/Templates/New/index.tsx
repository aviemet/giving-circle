import { Title, Page, Section } from "@/components"
import TemplateForm from "@/features/templates/Form"
import { Routes } from "@/lib"


interface NewTemplateProps {
	template: Schema.TemplatesFormData
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/templates/new
// @route: newCircleTemplate
const NewTemplate = ({ template, circle }: NewTemplateProps) => {
	const title = "New Template"

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<TemplateForm
					to={ Routes.circleTemplates(circle.slug) }
					template={ template }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplate
