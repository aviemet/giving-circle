import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationVotesForm from '../Form'

interface EditPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesEdit
}

const EditPresentationVote = ({ presentation_vote }: EditPresentationVoteProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Votes', href: Routes.presentationVotes() },
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