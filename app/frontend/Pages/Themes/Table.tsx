import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'

const ThemeTable = (props: ITableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="title">Title</Table.Cell>
					<Table.Cell sort="question">Question</Table.Cell>
					<Table.Cell sort="quarter">Quarter</Table.Cell>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (theme: Schema.ThemesIndex) => (
					<Table.Row key={ theme.id }>
						<Table.Cell>
							<Link href={ Routes.theme(theme.id) }>{ theme.title }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.theme(theme.id) }>{ theme.question }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.theme(theme.id) }>{ theme.quarter }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.theme(theme.id) }>{ theme.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editTheme(theme.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default ThemeTable
