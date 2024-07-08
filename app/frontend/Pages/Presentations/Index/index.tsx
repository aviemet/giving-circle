import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import PresentationsTable from '../Table'

interface PresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesShare
	theme: Schema.ThemesShallow
}

const PresentationsIndex = ({ presentations, pagination, circle, theme }: PresentationIndexProps) => {
	return (
		<IndexPageTemplate
			title="Presentations"
			model="presentations"
			rows={ presentations }
			pagination={ pagination }
			navMenu={ getThemeMenu({ circle: circle, theme }) }
			contextMenu={ {
				options: [
					{ label: 'New Presentation', href: Routes.newThemePresentation(theme.slug), icon: <NewIcon /> },
				],
			} }
		>
			<PresentationsTable />
		</IndexPageTemplate>
	)
}

export default PresentationsIndex
