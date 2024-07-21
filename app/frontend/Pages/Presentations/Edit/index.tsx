import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationsForm from '../Form'

interface EditPresentationProps {
	presentation: Schema.PresentationsEdit
}

// @path: /presentations/:id/edit
// @route: editPresentation
const EditPresentation = ({ presentation }: EditPresentationProps) => {
	const title = 'Edit Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<PresentationsForm
					method='put'
					to={ Routes.presentation(presentation.id) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation
