import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/features'
import { NewIcon } from '@/components/Icons'
import PresentationVotesTable from '../Table'
import { Page } from '@/components'
import { usePageProps } from '@/lib/hooks'

interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/presentations/:presentation_slug/presentation_votes
// @route: presentationVotes
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
