import { Page, Section } from "@/components"
import PresentationVoteForm from "@/features/presentation/votes/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/new
// @route: newThemePresentationsVote
const NewPresentationVote = ({ ...data }: NewPresentationVoteProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"newThemePresentationsVote">()
	const title = "New Vote"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Votes", href: Routes.presentationVotes() },
			{ title: "New Vote", href: window.location.href },
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
