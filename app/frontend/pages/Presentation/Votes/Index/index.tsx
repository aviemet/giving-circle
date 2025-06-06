import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import PresentationVotesTable from "@/features/presentation/votes/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface PresentationVoteIndexProps {
	presentation_votes: Schema.PresentationVotesIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes
// @route: themePresentationsVotes
const PresentationVotesIndex = ({ presentation_votes, pagination }: PresentationVoteIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"themePresentationsVotes">()
	const title = "Vote"

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
							label: "New Vote",
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
