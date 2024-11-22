import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import ThemesTable from '../Table'
import { Page } from '@/Components'

interface ThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes
// @route: circleThemes
const ThemesIndex = ({ themes, pagination, circle }: ThemeIndexProps) => {
	const { params } = usePageProps<'circleThemes'>()

	return (
		<Page
			title="Themes"
		>
			<IndexTableTemplate
				model="themes"
				rows={ themes }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{ label: 'New Theme', href: Routes.newCircleTheme(params.circle_slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<ThemesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemesIndex
