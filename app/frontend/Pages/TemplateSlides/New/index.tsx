import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplateSlideForm from '../Form'

interface INewTemplateSlideProps {
	template_slide: Schema.TemplateSlidesFormData
}

const NewTemplateSlide = ({ ...data }: INewTemplateSlideProps) => {
	const title = 'New Template Slide'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<TemplateSlideForm
					to={ Routes.templateSlides() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplateSlide
