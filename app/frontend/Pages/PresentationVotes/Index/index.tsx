import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationVotesTable from '../Table'
import { Page } from '@/Components'
import { usePageProps } from '@/lib/hooks'

interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes
// @route: circleThemePresentationVotes
const PresentationVotesIndex = ({ presentation_votes, pagination }: PresentationVoteIndexProps) => {
	const { params } = usePageProps<'circleThemePresentationVotes'>()

	return (
		<Page
			title="People"
		>
			<IndexTableTemplate
				model="presentation_votes"
				rows={ presentation_votes }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.circleThemePresentationVotes(params.circle_slug, params.theme_slug, params.presentation_slug),
			// 	[
			// 		{ label: 'New Presentation Vote', href: Routes.newPresentationVote(), icon: NewIcon },
			// 	]
			// } }
			>
				<PresentationVotesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationVotesIndex
