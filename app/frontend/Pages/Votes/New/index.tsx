import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import VoteForm from '../Form'

interface NewVoteProps {
	vote: Schema.VotesFormData
}

const NewVote = ({ ...data }: NewVoteProps) => {
	const title = 'New Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Votes', href: Routes.votes() },
			{ title: 'New Vote', href: window.location.href },
		] }>

			<Section>
				<VoteForm
					to={ Routes.votes() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewVote
