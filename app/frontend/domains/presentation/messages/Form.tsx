import { useTranslation } from "react-i18next"

import { Grid, Stack } from "@/components"
import { Form, Submit, useFormField } from "@/components/Form"
import { Select } from "@/components/Inputs"
import { MessageContentFields } from "@/domains/messaging/MessageContentFields"
import { type HTTPVerb } from "@/lib/http"
import { normalizeMessagingTemplateString } from "@/lib/messaging/tagOptions"

export interface PresentationMessageFormProps {
	to: string
	method?: HTTPVerb
	presentation_message: Schema.PresentationMessagesFormData
}

export function PresentationMessageForm({
	to,
	method = "post",
	presentation_message,
}: PresentationMessageFormProps) {
	const isPersisted = method !== "post"

	return (
		<Form<{ presentation_message: Schema.PresentationMessagesFormData }>
			action={ to }
			method={ method }
			initialData={ {
				presentation_message: {
					...presentation_message,
					medium: presentation_message.medium || "email",
					body: normalizeMessagingTemplateString(presentation_message.body || ""),
					subject: normalizeMessagingTemplateString(presentation_message.subject ?? ""),
				},
			} }
		>
			<PresentationMessageFields
				isPersisted={ isPersisted }
				integrations={ presentation_message.integrations }
				interactions={ presentation_message.interactions }
			/>
		</Form>
	)
}

function PresentationMessageFields({
	isPersisted,
	integrations,
	interactions,
}: {
	isPersisted: boolean
	integrations: Schema.PresentationMessagesFormData["integrations"]
	interactions: Schema.PresentationMessagesFormData["interactions"]
}) {
	const { t } = useTranslation()
	const [mediumValue] = useFormField("presentation_message.medium")
	const medium = typeof mediumValue === "string" && mediumValue.length > 0 ? mediumValue : "email"

	const integrationOptions = integrations
		.filter((integration) => integration.medium === medium)
		.map((integration) => ({
			value: integration.id,
			label: integration.name,
		}))
	const interactionOptions = [
		{ value: "", label: t("presentation_messages.form.skip_interaction_none") },
		...interactions.map((interaction) => ({
			value: interaction.id,
			label: interaction.name,
		})),
	]

	return (
		<Stack gap="lg">
			<MessageContentFields
				fieldPrefix="presentation_message"
				isPersisted={ isPersisted }
			/>

			<Grid>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<Select
						name="presentation_message.integration_id"
						label={ t("presentation_messages.form.integration") }
						options={ integrationOptions }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<Select
						name="presentation_message.skip_interaction_id"
						label={ t("presentation_messages.form.skip_interaction") }
						options={ interactionOptions }
						clearable
					/>
				</Grid.Col>
			</Grid>

			<Submit>
				{ isPersisted ? t("presentation_messages.form.update") : t("presentation_messages.form.create") }
			</Submit>
		</Stack>
	)
}
