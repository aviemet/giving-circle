import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationElementForm from '../Form'

interface INewPresentationElementProps {
	presentation_element: Schema.PresentationElementsFormData
}

const NewPresentationElement = ({ ...data }: INewPresentationElementProps) => {
	const title = 'New Presentation Element'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<PresentationElementForm
					to={ Routes.presentationElements() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationElement
