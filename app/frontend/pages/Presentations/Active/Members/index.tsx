import { useTranslation } from "react-i18next"

import { Page, Title } from "@/components"
import { MembersTable } from "@/domains/presentations/active/MembersTable"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ActivePresentationMembersProps {
	presentation: Schema.PresentationsPersisted
	members: Schema.PresentationsActiveMember[]
	finalist_interaction_slug?: string | null
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/members
// @route: themePresentationMembers
const ActivePresentationMembers = ({
	presentation,
	members,
	finalist_interaction_slug,
}: ActivePresentationMembersProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationMembers">()
	const title = t("presentations.active.members.title")

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
		>
			<MembersTable
				circleSlug={ params.circle_slug }
				presentationSlug={ presentation.slug }
				finalistInteractionSlug={ finalist_interaction_slug }
				records={ members }
			/>
		</Page>
	)
}

export default withLayout(ActivePresentationMembers, "presentation")
