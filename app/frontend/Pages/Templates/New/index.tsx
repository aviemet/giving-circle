import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplateForm from '../Form'

interface INewTemplateProps {
	template: Schema.TemplatesFormData
}

const NewTemplate = ({ ...data }: INewTemplateProps) => {
	const title = 'New Template'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<TemplateForm
					to={ Routes.templates() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTemplate
