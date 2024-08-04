import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationVotesTable from '../Table'

interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes
// @route: circleThemePresentationVotes
const PresentationVotesIndex = ({ presentation_votes, pagination }: PresentationVoteIndexProps) => {
	return (
		<IndexTableTemplate
			title="PresentationVotes"
			model="presentation_votes"
			rows={ presentation_votes }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.presentationVotes(),
				[
					{ label: 'New Presentation Vote', href: Routes.newPresentationVote(), icon: NewIcon },
				]
			} }
		>
			<PresentationVotesTable />
		</IndexTableTemplate>
	)
}

export default PresentationVotesIndex
