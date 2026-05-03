import { Group, Title, Menu } from "@/components"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"

import Empty from "./Empty"
import SmtpList, { type SmtpListRecord } from "./SmtpList"

interface MailSettingsProps {
	smtps: SmtpListRecord[]
}

// @path: /settings/integrations
// @route: settingsIntegrations
const Mail = ({ smtps }: MailSettingsProps) => {
	return (
		<SettingsLayout>
			<Group>
				<Title mb={ 24 }>Mail Settings</Title>
				<Menu position="bottom-end">
					<Menu.Target />
					<Menu.Dropdown>
						<Menu.Link href="/settings/mail/new">New Mail Connection</Menu.Link>
					</Menu.Dropdown>
				</Menu>
			</Group>

			{ smtps.length === 0 ? <Empty /> : <SmtpList smtps={ smtps } /> }
		</SettingsLayout>
	)
}

export default withLayout(Mail, "settings")
