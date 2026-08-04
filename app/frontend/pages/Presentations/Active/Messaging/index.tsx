import { useTranslation } from "react-i18next"

import { Group, Page, Section, Stack, Table, Text, Title } from "@/components"
import { SendMessageButton } from "@/components/Button"
import { withLayout } from "@/lib"
import {
	presentationMessageMediumLabel,
	presentationMessageStatusLabel,
} from "@/lib/messaging/labels"

interface ActiveMessagingProps {
	presentation: Schema.PresentationsPersisted
	presentation_messages: Schema.PresentationMessagesIndex[]
	circle: Schema.CirclesPersisted
	theme: Schema.ThemesPersisted
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/messaging
// @route: themePresentationAdminMessaging
const ActivePresentationMessaging = ({
	presentation_messages,
	circle,
	presentation,
}: ActiveMessagingProps) => {
	const { t } = useTranslation()
	const title = t("presentation_messages.active.title")

	return (
		<Page title={ title } heading={ <Title>{ title }</Title> }>
			<Section>
				{ presentation_messages.length === 0
					? (
						<Text c="dimmed">{ t("presentation_messages.active.empty") }</Text>
					)
					: (
						<Stack>
							<Table>
								<Table.Head>
									<Table.Row>
										<Table.HeadCell>{ t("presentation_messages.active.columns.name") }</Table.HeadCell>
										<Table.HeadCell>{ t("presentation_messages.active.columns.medium") }</Table.HeadCell>
										<Table.HeadCell>{ t("presentation_messages.active.columns.status") }</Table.HeadCell>
										<Table.HeadCell>{ t("presentation_messages.active.columns.send") }</Table.HeadCell>
									</Table.Row>
								</Table.Head>
								<Table.Body>
									{ presentation_messages.map((message) => (
										<Table.Row key={ message.id }>
											<Table.Cell>{ message.name }</Table.Cell>
											<Table.Cell>{ presentationMessageMediumLabel(message.medium) }</Table.Cell>
											<Table.Cell>{ presentationMessageStatusLabel(message.status) }</Table.Cell>
											<Table.Cell>
												<Group>
													<SendMessageButton
														circleSlug={ circle.slug }
														presentationSlug={ presentation.slug }
														messageSlug={ message.slug }
														initialData={ {
															slug: message.slug,
															status: message.status,
															delivery_results: message.delivery_results,
														} }
														labels={ {
															ready: t("presentation_messages.form.ready"),
															sending: t("presentation_messages.form.sending"),
															finished: t("presentation_messages.form.finished"),
														} }
													/>
												</Group>
											</Table.Cell>
										</Table.Row>
									)) }
								</Table.Body>
							</Table>
						</Stack>
					) }
			</Section>
		</Page>
	)
}

export default withLayout(ActivePresentationMessaging, "presentation")
