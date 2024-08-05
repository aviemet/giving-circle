import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowVoteProps {
	vote: Schema.VotesShow
}

const ShowVote = ({ vote }: ShowVoteProps) => {
	const title =  'Vote'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Vote', href: Routes.votes() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editVote(vote.id) }>
								Edit Vote
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowVote
