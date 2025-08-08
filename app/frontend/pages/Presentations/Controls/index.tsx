import { withLayout } from "@/lib"

interface PresentationControlsProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const PresentationControls = ({}: PresentationControlsProps) => {
	return (
		<>Presentation Controls</>
	)

}

export default withLayout(PresentationControls, "presentation")
