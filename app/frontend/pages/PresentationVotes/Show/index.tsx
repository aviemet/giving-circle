import React from "react"

import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"

interface IShowPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesShow
}

// @path: /:circle_slug/presentation_votes/:id
// @route: vote
const ShowPresentationVote = ({ presentation_vote }: IShowPresentationVoteProps) => {
	const title = "PresentationVote"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Presentation Vote", href: Routes.presentationVotes() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationVote(presentation_vote.id) }>
								Edit PresentationVote
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationVote
