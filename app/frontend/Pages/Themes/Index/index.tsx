import React from 'react'
import { Routes } from '@/lib'
import { NewIcon } from '@/Components/Icons'
import ThemesTable from '../Table'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { getCircleMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface IThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesShare
}

const ThemesIndex = ({ themes, pagination, circle }: IThemeIndexProps) => {
	return (
		<IndexPageTemplate
			title="Themes"
			model="themes"
			rows={ themes }
			pagination={ pagination }
			navMenu={ getCircleMenu({ circle }) }
			menuOptions={ [
				{ label: 'New Theme', href: Routes.newCircleTheme(circle.slug), icon: NewIcon },
			] }
		>
			<ThemesTable />
		</IndexPageTemplate>
	)
}

export default ThemesIndex
