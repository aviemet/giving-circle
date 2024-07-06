import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplateForm from '../Form'

interface NewTemplateProps {
	template: Schema.PresentationTemplatesFormData
	circle: Schema.CirclesOptions
}

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
