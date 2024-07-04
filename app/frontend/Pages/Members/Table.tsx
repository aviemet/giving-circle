import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

interface MembersTableProps extends TableProps {
	circle: Schema.CirclesShare
}

const MembersTable = ({ circle, ...props }: MembersTableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="first_name">First_name</Table.Cell>
					<Table.Cell sort="last_name">Last_name</Table.Cell>
					<Table.Cell sort="number">Number</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (member: Schema.MembersIndex) => (
					<Table.Row key={ member.id }>
						<Table.Cell>
							<Link href={ Routes.member(member.slug) }>{ member.first_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(member.slug) }>{ member.last_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(member.slug) }>{ member.number }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editMember(member.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default MembersTable
