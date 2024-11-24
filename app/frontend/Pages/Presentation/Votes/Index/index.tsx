import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import PresentationVotesTable from '../Table'

interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

const PresentationVotesIndex = ({ presentation_votes, pagination }: PresentationVoteIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Vote'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationVote() } icon={ <NewIcon /> }>
						New Vote
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				title="PresentationVotes"
				model="presentation_votes"
				rows={ presentation_votes }
				pagination={ pagination }
				contextMenu={
					[
						{
							label: 'New Vote',
							href: Routes.newPresentationVote(),
							icon: NewIcon,
							deleteRoute: Routes.presentationVotes(),
						},
					]
				}
			>
				<PresentationVotesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationVotesIndex
