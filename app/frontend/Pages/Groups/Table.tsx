import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const GroupTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (group: Schema.GroupsIndex) => (
					<Table.Row key={ group.id }>
						<Table.Cell>
							<Link href={ Routes.group(group.slug) }>{ group.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editGroup(group.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default GroupTable
