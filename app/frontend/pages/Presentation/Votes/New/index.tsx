import { Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationVoteForm from "../Form"

interface NewPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/new
// @route: newThemePresentationsVote
const NewPresentationVote = ({ ...data }: NewPresentationVoteProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"">()
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
