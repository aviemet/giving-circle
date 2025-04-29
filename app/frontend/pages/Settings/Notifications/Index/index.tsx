import React from 'react'
import SettingsLayout from '@/layouts/AppLayout/SettingsLayout'
import { Title } from '@/components'

// @path: /settings/notifications
// @route: settingsNotifications
const Appearance = () => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Notifications Settings</Title>
		</SettingsLayout>
	)
}

export default Appearance
