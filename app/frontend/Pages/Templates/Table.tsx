import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const TemplateTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (template: Schema.PresentationTemplatesIndex) => (
					<Table.Row key={ template.id }>
						<Table.Cell>
							<Link href={ Routes.presentationTemplate(template.id) }>{ template.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationTemplate(template.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default TemplateTable
