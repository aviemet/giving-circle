import { Title } from "@/components"
import { SmtpForm } from "@/domains/settings/integrations/Form"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"

interface NewMailProps {
	smtp: Schema.SmtpsFormData
}

const NewMail = ({ smtp }: NewMailProps) => {
	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				smtp={ smtp }
				to={ Routes.settingsIntegrations() }
			/>
		</SettingsLayout>
	)
}

export default withLayout(NewMail, "settings")
