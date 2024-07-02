import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationElementsForm from '../Form'

interface IEditPresentationElementProps {
	presentation_element: Schema.PresentationElementsEdit
}

const EditPresentationElement = ({ presentation_element }: IEditPresentationElementProps) => {
	const title = 'Edit Presentation Element'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>
				
				<PresentationElementsForm
					method='put'
					to={ Routes.presentationElement() }
					presentation_element={ presentation_element }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationElement
