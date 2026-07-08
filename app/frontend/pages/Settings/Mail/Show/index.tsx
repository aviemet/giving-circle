import { Box, DangerousHtml, Page, Table } from "@/components"

interface ShowMailSettingProps {
	smtp: Schema.SmtpsShow
}

// @path: /settings/:circle_slug/mail/:id
// @route: settingsSmtp
const ShowMailSetting = ({ smtp }: ShowMailSettingProps) => {
	return (
		<Page title={ `Settings: ${smtp.name}` }>

			<Table>
				<Table.Body>

					<Table.Row>
						<Table.Cell>Host</Table.Cell>
						<Table.Cell>{ smtp.host }</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>Port</Table.Cell>
						<Table.Cell>{ smtp.port }</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>Domain</Table.Cell>
						<Table.Cell>{ smtp.domain }</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>Security</Table.Cell>
						<Table.Cell>{ smtp.security }</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>Reply-To Address</Table.Cell>
						<Table.Cell>{ smtp.address }</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell colSpan={ 2 }>
							<Box>Notes</Box>
							<DangerousHtml>{ smtp.notes }</DangerousHtml>
						</Table.Cell>
					</Table.Row>

				</Table.Body>
			</Table>
		</Page>
	)
}

export default ShowMailSetting
