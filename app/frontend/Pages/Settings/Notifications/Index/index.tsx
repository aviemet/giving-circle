import React from 'react'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Title } from '@/Components'

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
