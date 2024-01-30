import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import PresentationsTable from '../Table'
import { usePageProps } from '@/lib/hooks'

interface IPresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
}

const PresentationsIndex = ({ presentations, pagination }: IPresentationIndexProps) => {
	const { params } = usePageProps()

	return (
		<IndexPageTemplate
			title="Presentations"
			model="presentations"
			rows={ presentations }
			pagination={ pagination }
			menuOptions={ [
				{ label: 'New Presentation', href: Routes.newThemePresentation(params.theme_slug), icon: NewIcon },
			] }
		>
			<PresentationsTable />
		</IndexPageTemplate>
	)
}

export default PresentationsIndex
