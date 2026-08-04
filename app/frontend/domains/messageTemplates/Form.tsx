import { useTranslation } from "react-i18next"

import { Stack } from "@/components"
import { Form, Submit } from "@/components/Form"
import { MessageContentFields } from "@/domains/messaging/MessageContentFields"
import { type HTTPVerb } from "@/lib/http"
import { normalizeMessagingTemplateString } from "@/lib/messaging/tagOptions"

type MessageTemplateFormData = {
	message_template: Schema.MessageTemplatesFormData
}

export interface MessageTemplateFormProps {
	to: string
	method?: HTTPVerb
	message_template: Schema.MessageTemplatesFormData
}

export function MessageTemplateForm({
	to,
	method = "post",
	message_template,
}: MessageTemplateFormProps) {
	const { t } = useTranslation()
	const isPersisted = method !== "post"

	return (
		<Form<MessageTemplateFormData>
			action={ to }
			method={ method }
			initialData={ {
				message_template: {
					...message_template,
					medium: message_template.medium || "email",
					body: normalizeMessagingTemplateString(message_template.body || ""),
					subject: normalizeMessagingTemplateString(message_template.subject ?? ""),
				},
			} }
		>
			<Stack gap="lg">
				<MessageContentFields
					fieldPrefix="message_template"
					isPersisted={ isPersisted }
				/>

				<Submit>
					{ isPersisted ? t("message_templates.form.update") : t("message_templates.form.create") }
				</Submit>
			</Stack>
		</Form>
	)
}
