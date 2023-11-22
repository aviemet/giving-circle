import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationForm from '../Form'

interface INewPresentationProps {
	presentation: Schema.PresentationsFormData
}

const NewPresentation = ({ ...data }: INewPresentationProps) => {
	const title = 'New Presentation'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentations', href: Routes.presentations() },
			{ title: 'New Presentation' },
		] }>

			<Section>
				<Heading>{ title }</Heading>

				<PresentationForm
					to={ Routes.presentations() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
