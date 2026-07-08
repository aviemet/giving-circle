import { Group, Page, Menu } from "@/components"
import { Empty } from "@/domains/settings/mail/Empty"
import { SmtpList } from "@/domains/settings/mail/SmtpList"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface MailSettingsProps {
	smtps: Schema.SmtpsIndex[]
}

// @path: /settings/:circle_slug/mail
// @route: settingsSmtps
const MailSettings = ({ smtps }: MailSettingsProps) => {
	const { params } = usePageProps<"settingsSmtps">()

	return (
		<Page title="Settings: Mail">
			<Group justify="flex-end" mb="md">
				<Menu position="bottom-end">
					<Menu.Target />
					<Menu.Dropdown>
						<Menu.Link href={ Routes.newSettingsSmtp(params.circle_slug) }>New Mail Connection</Menu.Link>
					</Menu.Dropdown>
				</Menu>
			</Group>

			{ smtps.length === 0 ? <Empty /> : <SmtpList smtps={ smtps } circleSlug={ params.circle_slug } /> }
		</Page>
	)
}

export default MailSettings
