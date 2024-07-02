import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import PresentationsTable from '../Table'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

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
			menuOptions={ [
				{ label: 'New Presentation', href: Routes.newThemePresentation(theme.slug), icon: NewIcon },
			] }
		>
			<PresentationsTable />
		</IndexPageTemplate>
	)
}

export default PresentationsIndex
