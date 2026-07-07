import { Group, Title, Menu } from "@/components"
import { Empty } from "@/domains/settings/mail/Empty"
import { SmtpList } from "@/domains/settings/mail/SmtpList"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface MailSettingsProps {
	smtps: Schema.SmtpsIndex[]
}

// @path: /settings/mail
// @route: settingsSmtps
const Mail = ({ smtps }: MailSettingsProps) => {
	const { params } = usePageProps()
	const circleSlug = typeof params.circle_slug === "string" ? params.circle_slug : undefined
	const mailRouteOptions = circleSlug ? { circle_slug: circleSlug } : undefined

	return (
		<SettingsLayout>
			<Group>
				<Title mb={ 24 }>Mail Settings</Title>
				{ mailRouteOptions && (
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.newSettingsSmtp(mailRouteOptions) }>New Mail Connection</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				) }
			</Group>

			{ smtps.length === 0 ? <Empty /> : <SmtpList smtps={ smtps } circleSlug={ circleSlug } /> }
		</SettingsLayout>
	)
}

export default withLayout(Mail, "settings")
