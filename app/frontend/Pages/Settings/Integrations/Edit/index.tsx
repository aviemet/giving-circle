import React from 'react'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Heading } from '@/Components'
import { Routes } from '@/lib'
import SmtpForm from '../Form'

interface SmtpFormProps {
	smtp: Schema.Smtp
}

const EditMail = ({ smtp }: SmtpFormProps) => {
	return (
		<SettingsLayout>
			<Heading mb={ 24 }>Mail Settings</Heading>

			<SmtpForm
				method="put"
				data={ { smtp } }
				to={ Routes.settingsIntegrations(smtp.id!) }
			/>
		</SettingsLayout>
	)
}

export default EditMail
