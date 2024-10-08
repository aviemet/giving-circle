import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'
import { usePageProps } from '@/lib/hooks'

const ThemeTable = (props: TableProps) => {
	const { params } = usePageProps<'circleThemes'>()
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="title">Title</Table.Cell>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (theme: Schema.ThemesIndex) => (
					<Table.Row key={ theme.id }>
						<Table.Cell>
							<Link href={ Routes.circleTheme(params.circle_slug, theme.slug) }>{ theme.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.circleTheme(params.circle_slug, theme.slug) }>{ theme.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.circleEditTheme(params.circle_slug, theme.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default ThemeTable
