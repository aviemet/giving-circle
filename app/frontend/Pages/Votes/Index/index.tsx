import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import VotesTable from '../Table'

interface VoteIndexProps {
	votes: Schema.VotesIndex[]
	pagination: Schema.Pagination
}

const VotesIndex = ({ votes, pagination }: VoteIndexProps) => {
	return (
		<IndexTableTemplate
			title="Votes"
			model="votes"
			rows={ votes }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.votes(),
				[
					{ label: 'New Vote', href: Routes.newVote(), icon: NewIcon },
				]
			} }
		>
			<VotesTable />
		</IndexTableTemplate>
	)
}

export default VotesIndex
