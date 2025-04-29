import React from "react"

import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

const CircleTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (circle: Schema.CirclesIndex) => (
					<Table.Row key={ circle.id }>
						<Table.Cell>
							<Link href={ Routes.circle(circle.id) }>{ circle.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editCircle(circle.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default CircleTable
