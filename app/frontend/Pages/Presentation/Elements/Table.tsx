import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const PresentationElementTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="data">Data</Table.Cell>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="template">Template</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_element: Schema.PresentationElementsIndex) => (
					<Table.Row key={ presentation_element.id }>
						<Table.Cell>
							<Link href={ Routes.presentationElement(presentation_element.id) }>{ presentation_element.data }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationElement(presentation_element.id) }>{ presentation_element.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationElement(presentation_element.id) }>{ presentation_element.template }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationElement(presentation_element.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationElementTable