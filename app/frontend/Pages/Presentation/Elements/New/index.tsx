import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationElementForm from '../Form'

interface NewPresentationElementProps {
	presentation_element: Schema.PresentationElementsFormData
}

const NewPresentationElement = ({ ...data }: NewPresentationElementProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'New Element'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Elements', href: Routes.presentationElements() },
			{ title: 'New Element', href: window.location.href },
		] }>

			<Section>
				<PresentationElementForm
					to={ Routes.presentationElements() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationElement
