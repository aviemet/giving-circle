import { Page } from "@/components"
import { SmtpForm } from "@/domains/settings/mail/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditMailProps {
	smtp: Schema.SmtpsFormData
}

// @path: /settings/:circle_slug/mail/:id/edit
// @route: editSettingsSmtp
const EditMailSettings = ({ smtp }: EditMailProps) => {
	const { params } = usePageProps<"editSettingsSmtp">()

	return (
		<Page title="Settings: Mail">
			<SmtpForm
				method="put"
				smtp={ smtp }
				to={ Routes.settingsSmtp(params.circle_slug, params.id) }
			/>
		</Page>
	)
}

export default EditMailSettings
