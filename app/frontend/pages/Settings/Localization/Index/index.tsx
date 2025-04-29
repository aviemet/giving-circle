import React from 'react'
import SettingsLayout from '@/layouts/AppLayout/SettingsLayout'
import { Title } from '@/components'

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
