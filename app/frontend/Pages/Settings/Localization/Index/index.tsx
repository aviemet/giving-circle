import React from 'react'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Title } from '@/Components'

// @path: /settings/localizations
// @route: settingsLocalizations
const LocalizationSettings = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Logs</Title>
		</SettingsLayout>
	)
}

export default LocalizationSettings
