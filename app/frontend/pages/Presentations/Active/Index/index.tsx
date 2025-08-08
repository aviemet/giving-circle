import { withLayout } from "@/lib"

interface ActivePresentationControlsProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({}: ActivePresentationControlsProps) => {
	return (
		<>Presentation Controls</>
	)

}

export default withLayout(ActivePresentationControls, "presentation")
