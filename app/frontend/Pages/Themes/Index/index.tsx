import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { NewIcon } from '@/Components/Icons'
import { IndexPageTemplate } from '@/Features'
import ThemesTable from '../Table'

interface ThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/themes
// @route: circleThemes
const ThemesIndex = ({ themes, pagination, circle }: ThemeIndexProps) => {
	const { params } = usePageProps<'circleThemes'>()

	return (
		<IndexPageTemplate
			title="Themes"
			model="themes"
			rows={ themes }
			pagination={ pagination }
			contextMenu={ {
				options: [
					{ label: 'New Theme', href: Routes.newCircleTheme(params.circle_slug), icon: <NewIcon /> },
				],
			} }
		>
			<ThemesTable />
		</IndexPageTemplate>
	)
}

export default ThemesIndex
