import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import TemplatesForm from '../Form'

interface IEditTemplateProps {
	template: Schema.TemplatesEdit
}

const EditTemplate = ({ template }: IEditTemplateProps) => {
	const title = 'Edit Template'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>
				
				<TemplatesForm
					method='put'
					to={ Routes.template() }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
