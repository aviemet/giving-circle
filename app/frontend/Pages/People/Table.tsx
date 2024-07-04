import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const PersonTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="first_name">First_name</Table.Cell>
					<Table.Cell sort="last_name">Last_name</Table.Cell>
					<Table.Cell sort="middle_name">Middle_name</Table.Cell>
					<Table.Cell sort="active">Active</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (person: Schema.PeopleIndex) => (
					<Table.Row key={ person.id }>
						<Table.Cell>
							<Link href={ Routes.person(person.id) }>{ person.first_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.person(person.id) }>{ person.last_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.person(person.id) }>{ person.middle_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.person(person.id) }>{ person.active }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPerson(person.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PersonTable
