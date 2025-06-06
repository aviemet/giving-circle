import { Page, Section } from "@/components"
import PresentationVoteForm from "@/features/presentationVotes/Form"
import { Routes } from "@/lib"


interface NewPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesFormData
}

// @path: /:circle_slug/presentations/:presentation_slug/presentation_votes/new
// @route: newPresentationVote
const NewPresentationVote = ({ ...data }: NewPresentationVoteProps) => {
	const title = "New Presentation Vote"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Presentation Votes", href: Routes.presentationVotes() },
			{ title: "New Presentation Vote", href: window.location.href },
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
