import React from 'react'
import { Page, Section } from '@/Components'
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
				<TemplatesForm
					method='put'
					to={ Routes.circlePresentationTemplate(template.circle.slug, template.slug) }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
