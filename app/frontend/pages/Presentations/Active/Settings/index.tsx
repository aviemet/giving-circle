import { withLayout } from "@/lib"

interface ActivePresentationSettingsProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/settings
// @route: themePresentationSettings
const ActivePresentationSettings = ({}: ActivePresentationSettingsProps) => {
	return (
		<>Settings</>
	)

}

export default withLayout(ActivePresentationSettings, "presentation")
