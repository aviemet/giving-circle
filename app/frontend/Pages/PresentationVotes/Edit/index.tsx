import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationVotesForm from '../Form'

interface IEditPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesEdit
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id/edit
// @route: editCircleThemePresentationVote
const EditPresentationVote = ({ presentation_vote }: IEditPresentationVoteProps) => {
	const title = 'Edit Presentation Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Votes', href: Routes.presentationVotes() },
			{ title: "PresentationVote", href: Routes.presentationVote(presentation_vote.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<PresentationVotesForm
					method='put'
					to={ Routes.presentationVote() }
					presentation_vote={ presentation_vote }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationVote
