import React from 'react'
import SettingsLayout from '../../SettingsLayout'
import { Heading } from '@/Components'
import { Routes } from '@/lib'
import SmtpForm from '../Form'

interface ISmtpFormProps {
	smtp: Schema.Smtp
}

const EditMail = ({ smtp }: ISmtpFormProps) => {
	return (
		<SettingsLayout breadcrumbs={ [
			{ title: 'Settings', href: Routes.settingsGeneralIndex() },
			{ title: 'Mail', href: Routes.settingsSmtps() },
			{ title: smtp.name!, href: Routes.settingsSmtp(smtp.id!) },
			{ title: 'Edit', href: Routes.editSettingsSmtp(smtp.id!) },
		] }>
			<Heading mb={ 24 }>Mail Settings</Heading>

			<SmtpForm
				method="put"
				data={ { smtp } }
				to={ Routes.settingsSmtp(smtp.id!) }
			/>
		</SettingsLayout>
	)
}

export default EditMail
