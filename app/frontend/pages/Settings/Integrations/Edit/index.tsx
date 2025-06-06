import { Title } from "@/components"
import SmtpForm from "@/features/settings/integrations/Form"
import SettingsLayout from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"


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

export default withLayout(EditMail, "settings")
