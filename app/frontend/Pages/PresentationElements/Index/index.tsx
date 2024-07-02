import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import PresentationElementsTable from '../Table'

interface IPresentationElementIndexProps {
	presentation_elements: Schema.PresentationElementsIndex[]
	pagination: Schema.Pagination
}

const PresentationElementsIndex = ({ presentation_elements, pagination }: IPresentationElementIndexProps) => {
	return (
		<IndexPageTemplate
			title="PresentationElements"
			model="presentation_elements"
			rows={ presentation_elements }
			pagination={ pagination }
			deleteRoute={ Routes.presentationElements() }
			menuOptions={ [
				{ label: 'New Presentation Element', href: Routes.newPresentationElement(), icon: NewIcon },
			] }
		>
			<PresentationElementsTable />
		</IndexPageTemplate>
	)
}

export default PresentationElementsIndex
