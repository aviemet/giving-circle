import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplatesForm from '../Form'

interface EditTemplateProps {
	template: Schema.PresentationTemplatesEdit
}

const EditTemplate = ({ template }: EditTemplateProps) => {
	const title = 'Edit Template'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<TemplatesForm
					method='put'
					to={ Routes.circlePresentationTemplate(template.circle_id, template.id) }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
