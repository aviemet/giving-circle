import React from 'react'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Title } from '@/Components'

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
