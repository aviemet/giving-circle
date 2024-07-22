import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditPresentationProps {
	presentation: Schema.PresentationsEdit
}

// @path: /presentations/:id/edit
// @route: editPresentation
const EditPresentation = ({ presentation }: EditPresentationProps) => {
	const { params } = usePageProps<'editPresentation'>()

	const title = 'Edit Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<PresentationsForm
					method='put'
					to={ Routes.presentation(params.id) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation
