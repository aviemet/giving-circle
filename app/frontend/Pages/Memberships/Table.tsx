import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const MemberTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="number">Number</Table.Cell>
					<Table.Cell sort="funds">Funds</Table.Cell>
					<Table.Cell sort="active">Active</Table.Cell>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (member: Schema.MembersIndex) => (
					<Table.Row key={ member.id }>
						<Table.Cell>
							<Link href={ Routes.member(member.id) }>{ member.number }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(member.id) }>{ member.funds }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(member.id) }>{ member.active }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(member.id) }>{ member.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editMember(member.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default MemberTable
