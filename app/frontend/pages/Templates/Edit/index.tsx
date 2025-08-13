import { Page, Section } from "@/components"
import TemplatesForm from "@/features/templates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditTemplateProps {
	template: Schema.TemplatesEdit
}

// @path: /:circle_slug/templates/:slug/edit
// @route: editCircleTemplate
const EditTemplate = ({ template }: EditTemplateProps) => {
	const { params, active_circle } = usePageProps<"editCircleTemplate">()

	const title = "Edit Template"

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Templates", href: Routes.circleTemplates(params.circle_slug) },
				{ title: "Edit", href: window.location.href },
			] }
		>
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
