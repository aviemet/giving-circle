import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'

const VoteTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="type">Type</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (vote: Schema.VotesIndex) => (
					<Table.Row key={ vote.id }>
						<Table.Cell>
							<Link href={ Routes.vote(vote.id) }>{ vote.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.vote(vote.id) }>{ vote.type }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editVote(vote.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default VoteTable
