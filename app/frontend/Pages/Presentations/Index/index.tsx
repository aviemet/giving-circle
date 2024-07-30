import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationsTable from '../Table'
import { usePageProps } from '@/lib/hooks'
import { Page } from '@/Components'

interface PresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations
// @route: circleThemePresentations
const PresentationsIndex = ({ presentations, pagination, circle, theme }: PresentationIndexProps) => {
	const { params } = usePageProps<'circleThemePresentations'>()

	return (
		<Page
			title="Presentations"
		>
			<IndexTableTemplate
				model="presentations"
				rows={ presentations }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{ label: 'New Presentation', href: Routes.newCircleThemePresentation(params.circle_slug, params.theme_slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<PresentationsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationsIndex
