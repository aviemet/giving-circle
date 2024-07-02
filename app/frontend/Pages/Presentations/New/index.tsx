import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

const NewPresentation = ({ ...data }: NewPresentationProps) => {
	const { params } = usePageProps()

	const title = 'New Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<PresentationForm
					to={ Routes.themePresentations(params.theme_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
