import { Group, Title, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowTemplateProps {
	template: Schema.TemplatesShow
}

// @path: /:circle_slug/templates/:slug
// @route: circleTemplate
const ShowTemplate = ({ template }: ShowTemplateProps) => {
	const { params, active_circle } = usePageProps<"editCircleTemplate">()

	if(!active_circle) return <></>

	const title = template.name || "Template"

	return (
		<Page
			title={ title }
			heading={
				<Group>
					<Title>{ title }</Title>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleTemplate(template.circle.slug, template.slug) }>
								Edit Template
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			}
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Templates", href: Routes.circleTemplates(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>

			</Section>
		</Page>
	)
}

export default ShowTemplate
