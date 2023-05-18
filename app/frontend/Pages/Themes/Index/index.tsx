import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import ThemesTable from '../Table'

interface IThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
}

const ThemesIndex = ({ themes, pagination }: IThemeIndexProps) => {
	return (
		<IndexPageTemplate
			title="Themes"
			model="themes"
			rows={ themes }
			pagination={ pagination }
			deleteRoute={ Routes.themes() }
			menuOptions={ [
				{ label: 'New Theme', href: Routes.newTheme(), icon: NewIcon },
			] }
		>
			<ThemesTable />
		</IndexPageTemplate>
	)
}

export default ThemesIndex
