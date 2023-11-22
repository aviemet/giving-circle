import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationsForm from '../Form'

interface IEditPresentationProps {
	presentation: Schema.PresentationsEdit
}

const EditPresentation = ({ presentation }: IEditPresentationProps) => {
	const title = 'Edit Presentation'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentations', href: Routes.presentations() },
			{ title: Presentation, href: Routes.presentation(presentation.id) },
			{ title },
		] }>
			<Section>
				<Heading>{ title }</Heading>
				
				<PresentationsForm
					method='put'
					to={ Routes.presentation() }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation
