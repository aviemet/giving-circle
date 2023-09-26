import React from 'react'
import { Routes } from '@/lib'
import { NewIcon } from '@/Components/Icons'
import ThemesTable from '../Table'
import { Container, Heading, Table } from '@/Components'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'

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
		// <Container>
		// 	<Table.TableProvider
		// 		model="circle"
		// 		rows={ themes }
		// 		pagination={ pagination }
		// 	>
		// 		<Heading>Themes</Heading>
		// 		<ThemesTable />
		// 	</Table.TableProvider>
		// </Container>
	)
}

export default ThemesIndex
