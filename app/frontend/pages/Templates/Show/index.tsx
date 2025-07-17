import { Group, Title, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"

interface ShowTemplateProps {
	template: Schema.TemplatesShow
}

// @path: /:circle_slug/templates/:slug
// @route: circleTemplate
const ShowTemplate = ({ template }: ShowTemplateProps) => {
	const title = "Template"

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleTemplate(template.circle.slug, template.slug) }>
								Edit Template
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowTemplate
