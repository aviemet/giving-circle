import { Title } from "@/components"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"
import { withLayout } from "@/lib"

// @path: /settings/general
// @route: settingsGeneral
const General = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>General Settings</Title>
		</SettingsLayout>
	)
}

export default withLayout(General, "settings")
