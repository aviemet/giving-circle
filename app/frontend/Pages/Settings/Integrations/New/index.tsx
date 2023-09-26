import React from 'react'
import SettingsLayout from '../../SettingsLayout'
import { Heading } from '@/Components'
import { Routes } from '@/lib'
import SmtpForm from '../Form'

interface ISmtpFormProps {
	smtp: Schema.Smtp
}

const NewMail = ({ smtp }: ISmtpFormProps) => {
	return (
		<SettingsLayout breadcrumbs={ [
			{ title: 'Settings', href: Routes.settingsGeneralIndex() },
			{ title: 'Mail', href: Routes.settingsSmtps() },
			{ title: 'New', href: Routes.newSettingsSmtp() },
		] }>
			<Heading mb={ 24 }>Mail Settings</Heading>

			<SmtpForm
				data={ { smtp } }
				to={ Routes.settingsSmtps() }
			/>
		</SettingsLayout>
	)
}

export default NewMail
