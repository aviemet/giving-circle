import React from 'react'
import SettingsLayout from '@/layouts/AppLayout/SettingsLayout'
import { Title } from '@/components'
import { Routes } from '@/lib'
import SmtpForm from '../Form'

interface SmtpFormProps {
	smtp: Schema.Smtp
}

const EditMail = ({ smtp }: SmtpFormProps) => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				method="put"
				data={ { smtp } }
				to={ Routes.settingsIntegrations(smtp.id!) }
			/>
		</SettingsLayout>
	)
}

export default EditMail
