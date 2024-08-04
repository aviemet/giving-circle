import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'

const PresentationVoteTable = (props: ITableProps) => {
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
				<Table.RowIterator render={ (presentation_vote: Schema.PresentationVotesIndex) => (
					<Table.Row key={ presentation_vote.id }>
						<Table.Cell>
							<Link href={ Routes.presentationVote(presentation_vote.id) }>{ presentation_vote.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationVote(presentation_vote.id) }>{ presentation_vote.type }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationVote(presentation_vote.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationVoteTable