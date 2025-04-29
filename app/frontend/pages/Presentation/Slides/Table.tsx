import React from "react"

import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

const PresentationSlideTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="data">Data</Table.Cell>
					<Table.Cell sort="order">Order</Table.Cell>
					<Table.Cell sort="template">Template</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_slide: Schema.PresentationSlidesIndex) => (
					<Table.Row key={ presentation_slide.id }>
						<Table.Cell>
							<Link href={ Routes.presentationSlide(presentation_slide.id) }>{ presentation_slide.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationSlide(presentation_slide.id) }>{ presentation_slide.data }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationSlide(presentation_slide.id) }>{ presentation_slide.order }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationSlide(presentation_slide.id) }>{ presentation_slide.template }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationSlide(presentation_slide.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationSlideTable
