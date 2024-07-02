import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'

const TemplateSlideTable = (props: ITableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="title">Title</Table.Cell>
					<Table.Cell sort="content">Content</Table.Cell>
					
					<Table.Cell sort="order">Order</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (template_slide: Schema.TemplateSlidesIndex) => (
					<Table.Row key={ template_slide.id }>
						<Table.Cell>
							<Link href={ Routes.templateSlide(template_slide.id) }>{ template_slide.title }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.templateSlide(template_slide.id) }>{ template_slide.content }</Link>
						</Table.Cell>
						
						<Table.Cell>
							<Link href={ Routes.templateSlide(template_slide.id) }>{ template_slide.order }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editTemplateSlide(template_slide.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default TemplateSlideTable
