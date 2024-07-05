import React from 'react'
import { Routes } from '@/lib'
import { Table, Link, Text } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'
import { usePageProps } from '@/lib/hooks'

const TemplateTable = (props: TableProps) => {
	const { circle } = usePageProps()

	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator
					emptyDataContent={ circle.slug && <>
						<Text>{ circle.name || 'This circle' } doesn&apos;t have any saved presentation templates</Text>
						<Link href={ Routes.newCirclePresentationTemplate(circle.slug) }>Create a new one</Link>
					</> }
					render={ (template: Schema.PresentationTemplatesIndex) => (
						<Table.Row key={ template.id }>
							<Table.Cell>
								<Link href={ Routes.circlePresentationTemplate(template.circle_id, template.id) }>{ template.name }</Link>
							</Table.Cell>
							<Table.Cell>
								<EditButton href={ Routes.editCirclePresentationTemplate(template.circle_id, template.id) } />
							</Table.Cell>
						</Table.Row>
					) } />
			</Table.Body>
		</Table>
	)
}

export default TemplateTable
