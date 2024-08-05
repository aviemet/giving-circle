import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import VotesForm from '../Form'

interface EditVoteProps {
	vote: Schema.VotesEdit
}

const EditVote = ({ vote }: EditVoteProps) => {
	const title = 'Edit Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Votes', href: Routes.votes() },
			{ title: "Vote", href: Routes.vote(vote.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<VotesForm
					method='put'
					to={ Routes.vote() }
					vote={ vote }
				/>
			</Section>
		</Page>
	)
}

export default EditVote
