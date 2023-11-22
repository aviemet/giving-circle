import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import PresentationsTable from '../Table'

interface IPresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
}

const PresentationsIndex = ({ presentations, pagination }: IPresentationIndexProps) => {
	return (
		<IndexPageTemplate
			title="Presentations"
			model="presentations"
			rows={ presentations }
			pagination={ pagination }
			deleteRoute={ Routes.presentations() }
			menuOptions={ [
				{ label: 'New Presentation', href: Routes.newPresentation(), icon: NewIcon },
			] }
		>
			<PresentationsTable />
		</IndexPageTemplate>
	)
}

export default PresentationsIndex
