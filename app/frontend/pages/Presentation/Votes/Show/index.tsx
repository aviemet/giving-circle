import { Group, Menu, Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/:id
// @route: themePresentationsVote
const ShowPresentationVote = ({ presentation_vote }: ShowPresentationVoteProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"">()
	const title = "PresentationVote"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Vote", href: Routes.presentationVotes() },
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
