import React from 'react'
import { Heading, Page, Section } from '@/Components'
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
				<Heading>{ title }</Heading>

				<TemplateForm
					to={ Routes.circlePresentationTemplates(circle.slug) }
					template={ template }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplate
