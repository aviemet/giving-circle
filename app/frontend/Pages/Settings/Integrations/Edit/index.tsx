import React from 'react'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Title } from '@/Components'
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
