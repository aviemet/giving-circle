import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

interface ThemeOrgTableProps extends TableProps{
	theme: Schema.ThemesInertiaShare
}

const ThemeOrgTable = ({ theme, ...props }: ThemeOrgTableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="slug">Ask</Table.Cell>
					<Table.Cell sort="description">Description</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (org: Schema.OrgsIndex) => (
					<Table.Row key={ org.id }>
						<Table.Cell>
							<Link href={ Routes.circleOrg(org.circle_id, org.slug) }>{ org.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.circleOrg(org.circle_id, org.slug) }>{ org.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							{ org.description }
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editCircleThemeOrg(org.circle.slug, theme.slug, org.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default ThemeOrgTable
