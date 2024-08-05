import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const LeverageTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="type">Type</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (leverage: Schema.LeveragesIndex) => (
					<Table.Row key={ leverage.id }>
						<Table.Cell>
							<Link href={ Routes.leverage(leverage.id) }>{ leverage.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.leverage(leverage.id) }>{ leverage.type }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editLeverage(leverage.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default LeverageTable
