import { useTranslation } from "react-i18next"

import { Grid, Stack, Text } from "@/components"
import { useFormField } from "@/components/Form"
import { RichText, SegmentedControl, TagsInput, TextInput } from "@/components/Inputs"
import { messagingTagOptions } from "@/lib/messaging/tagOptions"

import { EmailMessagePreview } from "./EmailMessagePreview"
import { SmsMessagePreview } from "./SmsMessagePreview"

export type MessagingFormFieldPrefix = "presentation_message" | "message_template"

export interface MessageContentFieldsProps {
	fieldPrefix: MessagingFormFieldPrefix
	isPersisted: boolean
}

export function MessageContentFields({
	fieldPrefix,
	isPersisted,
}: MessageContentFieldsProps) {
	const { t } = useTranslation()
	const [mediumValue] = useFormField(`${fieldPrefix}.medium`)
	const medium = typeof mediumValue === "string" && mediumValue.length > 0 ? mediumValue : "email"

	return (
		<>
			<TextInput
				name={ `${fieldPrefix}.name` }
				label={ t("messaging.form.name") }
				required
			/>

			{ isPersisted
				? (
					<Stack gap={ 4 }>
						<Text size="sm" fw={ 500 }>{ t("messaging.form.medium") }</Text>
						<Text>
							{ medium === "sms"
								? t("messaging.form.medium_sms")
								: t("messaging.form.medium_email") }
						</Text>
					</Stack>
				)
				: (
					<SegmentedControl
						name={ `${fieldPrefix}.medium` }
						label={ t("messaging.form.medium") }
						options={ [
							{ label: t("messaging.form.medium_email"), value: "email" },
							{ label: t("messaging.form.medium_sms"), value: "sms" },
						] }
					/>
				) }

			{ medium === "email" && (
				<TagsInput
					name={ `${fieldPrefix}.subject` }
					label={ t("messaging.form.subject") }
					options={ messagingTagOptions }
					required
				/>
			) }

			{ medium === "email"
				? (
					<Grid>
						<Grid.Col span={ { base: 12, md: 6 } }>
							<RichText
								name={ `${fieldPrefix}.body` }
								label={ t("messaging.form.body") }
								tagOptions={ messagingTagOptions }
								required
							/>
						</Grid.Col>
						<Grid.Col span={ { base: 12, md: 6 } }>
							<EmailMessagePreview fieldPrefix={ fieldPrefix } />
						</Grid.Col>
					</Grid>
				)
				: (
					<Grid>
						<Grid.Col span={ { base: 12, md: 6 } }>
							<TagsInput
								name={ `${fieldPrefix}.body` }
								label={ t("messaging.form.body") }
								options={ messagingTagOptions }
								required
							/>
						</Grid.Col>
						<Grid.Col span={ { base: 12, md: 6 } }>
							<SmsMessagePreview fieldPrefix={ fieldPrefix } />
						</Grid.Col>
					</Grid>
				) }
		</>
	)
}
