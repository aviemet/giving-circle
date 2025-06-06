import { Title } from "@/components"
import SmtpForm from "@/features/settings/integrations/Form"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"


interface SmtpFormProps {
	smtp: Schema.Smtp
}

const NewMail = ({ smtp }: SmtpFormProps) => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				data={ { smtp } }
				to={ Routes.settingsSmtps() }
			/>
		</SettingsLayout>
	)
}

export default withLayout(NewMail, "settings")
