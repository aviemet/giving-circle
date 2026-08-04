import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { Button, Stack, Text } from "@/components"
import { Routes } from "@/lib"
import { presentationMessageMediumLabel } from "@/lib/messaging/labels"

export interface ChooseMessageTemplateModalContentProps {
	messageTemplates: Schema.MessageTemplatesPersisted[]
	circleSlug: string
	themeSlug: string
	presentationSlug: string
}

export function ChooseMessageTemplateModalContent({
	messageTemplates,
	circleSlug,
	themeSlug,
	presentationSlug,
}: ChooseMessageTemplateModalContentProps) {
	const { t } = useTranslation()

	if(messageTemplates.length === 0) {
		return (
			<Text size="sm">{ t("presentation_messages.index.choose_template_modal.empty") }</Text>
		)
	}

	const emailTemplates = messageTemplates.filter((template) => template.medium === "email")
	const smsTemplates = messageTemplates.filter((template) => template.medium === "sms")

	const handleChoose = (templateId: string) => {
		router.visit(
			`${Routes.newThemePresentationMessage(circleSlug, themeSlug, presentationSlug)}?message_template_id=${templateId}`,
		)
		modals.closeAll()
	}

	return (
		<Stack gap="lg">
			{ emailTemplates.length > 0 && (
				<Stack gap="xs">
					<Text size="sm" fw={ 600 } c="dimmed">
						{ presentationMessageMediumLabel("email") }
					</Text>
					{ emailTemplates.map((template) => (
						<Button
							key={ template.id }
							variant="default"
							fullWidth
							onClick={ () => handleChoose(template.id) }
						>
							{ template.name }
						</Button>
					)) }
				</Stack>
			) }
			{ smsTemplates.length > 0 && (
				<Stack gap="xs">
					<Text size="sm" fw={ 600 } c="dimmed">
						{ presentationMessageMediumLabel("sms") }
					</Text>
					{ smsTemplates.map((template) => (
						<Button
							key={ template.id }
							variant="default"
							fullWidth
							onClick={ () => handleChoose(template.id) }
						>
							{ template.name }
						</Button>
					)) }
				</Stack>
			) }
		</Stack>
	)
}
