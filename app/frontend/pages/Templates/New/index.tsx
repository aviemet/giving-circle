import React from 'react'
import { Title, Page, Section } from '@/components'
import { Routes } from '@/lib'
import TemplateForm from '../Form'

interface NewTemplateProps {
	template: Schema.PresentationTemplatesFormData
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/presentation_templates/new
// @route: newCirclePresentationTemplate
const NewTemplate = ({ template, circle }: NewTemplateProps) => {
	const title = 'New Template'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<TemplateForm
					to={ Routes.circlePresentationTemplates(circle.slug) }
					template={ template }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplate
