import React from 'react'
import { Routes } from '@/lib'
import { NewIcon } from '@/Components/Icons'
import ThemesTable from '../Table'
import { Container, Heading, Table } from '@/Components'

interface IThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
}

const ThemesIndex = ({ themes, pagination }: IThemeIndexProps) => {
	return (
		<Container>
			<Table.TableProvider
				model="circle"
				rows={ themes }
				pagination={ pagination }
			>
				<Heading>Themes</Heading>
				<ThemesTable />
			</Table.TableProvider>
		</Container>
	)
}

export default ThemesIndex
