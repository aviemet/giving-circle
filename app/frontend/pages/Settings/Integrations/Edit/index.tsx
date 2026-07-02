import { Title } from "@/components"
import { SmtpForm } from "@/domains/settings/integrations/Form"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"

interface EditMailProps {
	smtp: Schema.SmtpsFormData
}

const EditMail = ({ smtp }: EditMailProps) => {
	if(!smtp.id) return null

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				method="put"
				smtp={ smtp }
				to={ Routes.settingsIntegrations() }
			/>
		</SettingsLayout>
	)
}

export default withLayout(EditMail, "settings")
