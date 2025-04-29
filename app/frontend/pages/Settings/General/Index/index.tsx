import React from 'react'
import SettingsLayout from '@/layouts/AppLayout/SettingsLayout'
import { Title } from '@/components'

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
