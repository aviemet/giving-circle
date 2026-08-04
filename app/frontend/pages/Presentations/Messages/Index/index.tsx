import { useTranslation } from "react-i18next"

import { Group, Page, Section, Stack, Text, Title } from "@/components"
import { MessagesMediumSection } from "@/domains/presentation/messages/MessagesMediumSection"
import { NewMessageSplitButton } from "@/domains/presentation/messages/NewMessageSplitButton"
import { withLayout } from "@/lib"

interface MessagingIndexProps {
	presentation: Schema.PresentationsPersisted
	presentation_messages: Schema.PresentationMessagesIndex[]
	message_templates: Schema.MessageTemplatesPersisted[]
	circle: Schema.CirclesPersisted
	theme: Schema.ThemesPersisted
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging
// @route: themePresentationMessaging
const PresentationMessagesIndex = ({
	presentation,
	presentation_messages,
	message_templates,
	circle,
	theme,
}: MessagingIndexProps) => {
	const { t } = useTranslation()
	const title = t("presentation_messages.index.title")
	const emailMessages = presentation_messages.filter((message) => message.medium === "email")
	const smsMessages = presentation_messages.filter((message) => message.medium === "sms")
	const hasMessages = presentation_messages.length > 0

	return (
		<Page title={ title } heading={ <Title>{ title }</Title> }>
			<Section>
				<Group justify="flex-end" mb="md">
					<NewMessageSplitButton
						messageTemplates={ message_templates }
						circleSlug={ circle.slug }
						themeSlug={ theme.slug }
						presentationSlug={ presentation.slug }
					/>
				</Group>

				{ hasMessages
					? (
						<Stack gap="xl">
							<MessagesMediumSection
								medium="email"
								messages={ emailMessages }
								circleSlug={ circle.slug }
								themeSlug={ theme.slug }
								presentationSlug={ presentation.slug }
							/>
							<MessagesMediumSection
								medium="sms"
								messages={ smsMessages }
								circleSlug={ circle.slug }
								themeSlug={ theme.slug }
								presentationSlug={ presentation.slug }
							/>
						</Stack>
					)
					: (
						<Text c="dimmed">{ t("presentation_messages.index.empty") }</Text>
					) }
			</Section>
		</Page>
	)
}

export default withLayout(PresentationMessagesIndex, "app")
