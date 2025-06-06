import { Title } from "@/components"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"
import { withLayout } from "@/lib"

// @path: /settings/notifications
// @route: settingsNotifications
const Appearance = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Notifications Settings</Title>
		</SettingsLayout>
	)
}

export default withLayout(Appearance, "settings")
