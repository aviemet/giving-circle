import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplateSlidesForm from '../Form'

interface IEditTemplateSlideProps {
	template_slide: Schema.TemplateSlidesEdit
}

const EditTemplateSlide = ({ template_slide }: IEditTemplateSlideProps) => {
	const title = 'Edit Template Slide'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>
				
				<TemplateSlidesForm
					method='put'
					to={ Routes.templateSlide() }
					template_slide={ template_slide }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplateSlide
