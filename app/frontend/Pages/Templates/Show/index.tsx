import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowTemplateProps {
	template: Schema.PresentationTemplatesShow
}

const ShowTemplate = ({ template }: ShowTemplateProps) => {
	const title =  'Template'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Heading>{ title }</Heading>

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