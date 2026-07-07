import { Title } from "@/components"
import { SmtpForm } from "@/domains/settings/mail/Form"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewMailProps {
	smtp: Schema.SmtpsFormData
}

// @path: /settings/mail/new
// @route: newSettingsSmtp
const NewMail = ({ smtp }: NewMailProps) => {
	const { params } = usePageProps()
	const circleSlug = typeof params.circle_slug === "string" ? params.circle_slug : undefined

	if(!circleSlug) return null

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Mail Settings</Title>

			<SmtpForm
				smtp={ smtp }
				to={ Routes.settingsSmtps({ circle_slug: circleSlug }) }
			/>
		</SettingsLayout>
	)
}

export default withLayout(NewMail, "settings")
