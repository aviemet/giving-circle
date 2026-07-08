import { Page } from "@/components"
import { SmtpForm } from "@/domains/settings/mail/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewMailProps {
	smtp: Schema.SmtpsFormData
}

// @path: /settings/:circle_slug/mail/new
// @route: newSettingsSmtp
const NewMailSettings = ({ smtp }: NewMailProps) => {
	const { params } = usePageProps<"newSettingsSmtp">()

	return (
		<Page title="Settings: Mail">
			<SmtpForm
				smtp={ smtp }
				to={ Routes.settingsSmtps(params.circle_slug) }
			/>
		</Page>
	)
}

export default NewMailSettings
