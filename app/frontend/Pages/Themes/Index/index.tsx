import React from 'react'
import { Routes } from '@/lib'
import { NewIcon } from '@/Components/Icons'
import ThemesTable from '../Table'
import { IndexPageTemplate } from '@/Features'
import { getCircleMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import { usePageProps } from '@/lib/hooks'

import { circles } from '@/lib/routes'
interface ThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

const ThemesIndex = ({ themes, pagination, circle }: ThemeIndexProps) => {
	const { params } = usePageProps()

	console.log({
		circles,
		template: circles.edit.pathTemplate,
		path: circles.edit.path({ slug: params.circle_slug }),
	})

	return (
		<IndexPageTemplate
			title="Themes"
			model="themes"
			rows={ themes }
			pagination={ pagination }
			navMenu={ getCircleMenu({ circle }) }
			contextMenu={ {
				options: [
					{ label: 'New Theme', href: Routes.newCircleTheme(circle.slug), icon: <NewIcon /> },
				],
			} }
		>
			<ThemesTable />
		</IndexPageTemplate>
	)
}

export default ThemesIndex
