import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const PresentationTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>

					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation: Schema.PresentationsIndex) => (
					<Table.Row key={ presentation.id }>

						<Table.Cell>
							<Link href={ Routes.presentation(presentation.id) }>{ presentation.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentation(presentation.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationTable
