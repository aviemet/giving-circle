import { withLayout } from "@/lib"

interface ActivePresentationMembersProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/members
// @route: themePresentationMembers
const ActivePresentationMembers = ({}: ActivePresentationMembersProps) => {
	return (
		<>Members</>
	)

}

export default withLayout(ActivePresentationMembers, "presentation")
