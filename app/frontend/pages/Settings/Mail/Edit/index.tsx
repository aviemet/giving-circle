import { Title } from "@/components"
import { SmtpForm } from "@/domains/settings/mail/Form"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditMailProps {
	smtp: Schema.SmtpsFormData
}

// @path: /settings/mail/:id/edit
// @route: editSettingsSmtp
const EditMail = ({ smtp }: EditMailProps) => {
	const { params } = usePageProps()
	const circleSlug = typeof params.circle_slug === "string" ? params.circle_slug : undefined

	if(!smtp.id || !circleSlug) return null

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				method="put"
				smtp={ smtp }
				to={ Routes.settingsSmtp(smtp.id, { circle_slug: circleSlug }) }
			/>
		</SettingsLayout>
	)
}

export default withLayout(EditMail, "settings")
