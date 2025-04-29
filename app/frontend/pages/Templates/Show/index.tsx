import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/components'
import { Routes } from '@/lib'

interface ShowTemplateProps {
	template: Schema.PresentationTemplatesShow
}

// @path: /circles/:circle_slug/presentation_templates/:slug
// @route: circlePresentationTemplate
const ShowTemplate = ({ template }: ShowTemplateProps) => {
	const title =  'Template'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCirclePresentationTemplate(template.circle_id, template.id) }>
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
