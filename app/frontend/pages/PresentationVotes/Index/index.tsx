import React from "react"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationVotesTable from "../Table"

interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/presentations/:presentation_slug/presentation_votes
// @route: presentationVotes
const PresentationVotesIndex = ({ presentation_votes, pagination }: PresentationVoteIndexProps) => {
	const { params } = usePageProps<"circleThemePresentationVotes">()

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
