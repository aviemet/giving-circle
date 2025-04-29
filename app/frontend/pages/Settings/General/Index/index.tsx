import React from "react"

import { Title } from "@/components"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"

// @path: /settings/general
// @route: settingsGeneral
const General = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>General Settings</Title>
		</SettingsLayout>
	)
}

export default General
