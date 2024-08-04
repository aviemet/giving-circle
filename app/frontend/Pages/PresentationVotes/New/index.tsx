import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationVoteForm from '../Form'

interface INewPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesFormData
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/new
// @route: newCircleThemePresentationVote
const NewPresentationVote = ({ ...data }: INewPresentationVoteProps) => {
	const title = 'New Presentation Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Votes', href: Routes.presentationVotes() },
			{ title: 'New Presentation Vote', href: window.location.href },
		] }>

			<Section>
				<PresentationVoteForm
					to={ Routes.presentationVotes() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationVote
