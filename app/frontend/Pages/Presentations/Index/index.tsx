import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationsTable from '../Table'
import { usePageProps } from '@/lib/hooks'

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
		<IndexPageTemplate
			title="Presentations"
			model="presentations"
			rows={ presentations }
			pagination={ pagination }
			contextMenu={ {
				options: [
					{ label: 'New Presentation', href: Routes.newCircleThemePresentation(params.circle_slug, params.theme_slug), icon: <NewIcon /> },
				],
			} }
		>
			<PresentationsTable />
		</IndexPageTemplate>
	)
}

export default PresentationsIndex
