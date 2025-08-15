import { withLayout } from "@/lib"

interface ActivePresentationMessagingProps {

}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/messaging
// @route: themePresentationMessaging
const ActivePresentationMessaging = ({}: ActivePresentationMessagingProps) => {
	return (
		<>Messaging</>
	)

}

export default withLayout(ActivePresentationMessaging, "presentation")
