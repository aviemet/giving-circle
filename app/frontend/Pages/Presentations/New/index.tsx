import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationForm from '../Form'

interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

// @path: /themes/:theme_slug/presentations/new
// @route: newThemePresentation
const NewPresentation = ({ presentation }: NewPresentationProps) => {
	const title = 'New Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<PresentationForm
					to={ Routes.themePresentations(presentation.theme_id) }
					presentation={ presentation }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
