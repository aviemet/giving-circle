import React from 'react'
import { Page, Section } from '@/components'
import { Routes } from '@/lib'
import TemplatesForm from '../Form'

interface EditTemplateProps {
	template: Schema.PresentationTemplatesEdit
}

// @path: /circles/:circle_slug/presentation_templates/:slug/edit
// @route: editCirclePresentationTemplate
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
