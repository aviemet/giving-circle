import { Title } from "@/components"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { withLayout } from "@/lib"

// @path: /settings/integrations
// @route: settingsIntegrations
const Integrations = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Integrations Settings</Title>
		</SettingsLayout>
	)
}

export default withLayout(Integrations, "settings")
