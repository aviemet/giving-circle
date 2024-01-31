import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'
import { usePageProps } from '@/lib/hooks'

const MemberTable = (props: ITableProps) => {
	const { params } = usePageProps()

	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="first_name">First_name</Table.Cell>
					<Table.Cell sort="last_name">Last_name</Table.Cell>
					<Table.Cell sort="number">Number</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (member: Schema.MembersIndex) => (
					<Table.Row key={ member.id }>
						<Table.Cell>
							<Link href={ Routes.member(params.member_slug) }>{ member.first_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(params.member_slug) }>{ member.last_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.member(params.member_slug) }>{ member.number }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editMember(params.member_slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default MemberTable
