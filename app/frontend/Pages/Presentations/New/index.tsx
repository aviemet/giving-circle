import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationForm from '../Form'

interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

const NewPresentation = ({ presentation }: NewPresentationProps) => {
	const title = 'New Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<PresentationForm
					to={ Routes.themePresentations(presentation.theme_id) }
					presentation={ presentation }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
