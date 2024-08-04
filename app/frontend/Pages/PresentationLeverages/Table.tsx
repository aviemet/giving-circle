import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'

const PresentationLeverageTable = (props: ITableProps) => {
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
				<Table.RowIterator render={ (presentation_leverage: Schema.PresentationLeveragesIndex) => (
					<Table.Row key={ presentation_leverage.id }>
						<Table.Cell>
							<Link href={ Routes.presentationLeverage(presentation_leverage.id) }>{ presentation_leverage.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationLeverage(presentation_leverage.id) }>{ presentation_leverage.type }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationLeverage(presentation_leverage.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationLeverageTable
