import { Page, Section } from "@/components"
import TemplateForm from "@/features/templates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewTemplateProps {
	template: Schema.TemplatesFormData
	circle: Schema.CirclesOptions
}

// @path: /:circle_slug/templates/new
// @route: newCircleTemplate
const NewTemplate = ({ template, circle }: NewTemplateProps) => {
	const { params, active_circle } = usePageProps<"newCircleTemplate">()

	const title = "New Template"

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Templates", href: Routes.circleTemplates(params.circle_slug) },
				{ title: "New", href: window.location.href },
			] }
		>
			<Section>
				<TemplateForm
					to={ Routes.circleTemplates(circle.slug) }
					template={ template }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplate
