import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/components'
import { EditButton } from '@/components/Button'
import { type TableProps } from '@/components/Table/Table'

const PresentationVoteTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="data">Data</Table.Cell>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="template">Template</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_vote: Schema.PresentationVotesIndex) => (
					<Table.Row key={ presentation_vote.id }>
						<Table.Cell>
							<Link href={ Routes.presentationVote(presentation_vote.id) }>{ presentation_vote.data }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationVote(presentation_vote.id) }>{ presentation_vote.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationVote(presentation_vote.id) }>{ presentation_vote.template }</Link>
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
