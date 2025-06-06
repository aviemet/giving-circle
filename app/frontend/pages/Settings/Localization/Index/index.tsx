import { Title } from "@/components"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"
import { withLayout } from "@/lib"

// @path: /settings/localizations
// @route: settingsLocalizations
const LocalizationSettings = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Logs</Title>
		</SettingsLayout>
	)
}

export default withLayout(LocalizationSettings, "settings")
