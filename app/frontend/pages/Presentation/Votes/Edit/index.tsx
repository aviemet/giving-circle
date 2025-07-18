import { Page, Section } from "@/components"
import PresentationVotesForm from "@/features/presentation/votes/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationVoteProps {
	presentation_vote: Schema.PresentationVotesEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/:id/edit
// @route: editThemePresentationsVote
const EditPresentationVote = ({ presentation_vote }: EditPresentationVoteProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"editThemePresentationsVote">()
	const title = "Edit Vote"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Votes", href: Routes.presentationVotes() },
			{ title: "PresentationVote", href: Routes.presentationVote(presentation_vote.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<PresentationVotesForm
					method="put"
					to={ Routes.presentationVote() }
					presentation_vote={ presentation_vote }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationVote
