import { withLayout } from "@/lib"

interface ActivePresentationOverviewProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/overview
// @route: themePresentationOverview
const ActivePresentationOverview = ({}: ActivePresentationOverviewProps) => {
	return (
		<>Overview</>
	)

}

export default withLayout(ActivePresentationOverview, "presentation")
