import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationElementsForm from '../Form'

interface EditPresentationElementProps {
	presentation_element: Schema.PresentationElementsEdit
}

const EditPresentationElement = ({ presentation_element }: EditPresentationElementProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Element'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Elements', href: Routes.presentationElements() },
			{ title: "PresentationElement", href: Routes.presentationElement(presentation_element.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
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