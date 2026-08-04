import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, Stack, Text } from "@/components"
import { useFormField } from "@/components/Form"
import { usePageProps } from "@/lib/hooks"
import { messagingPreviewValues, renderMessagingPreview } from "@/lib/messaging/previewRender"
import { useMockCircle } from "@/queries"

import * as classes from "./SmsMessagePreview.css"

export interface SmsMessagePreviewProps {
	fieldPrefix: "presentation_message" | "message_template"
}

export function SmsMessagePreview({ fieldPrefix }: SmsMessagePreviewProps) {
	const { t } = useTranslation()
	const { app_url } = usePageProps()
	const { data: mockCircle } = useMockCircle()
	const [bodyValue] = useFormField(`${fieldPrefix}.body`)
	const body = typeof bodyValue === "string" ? bodyValue : ""
	const previewValues = mockCircle ? messagingPreviewValues(mockCircle, app_url) : undefined
	const previewBody = previewValues ? renderMessagingPreview(body, previewValues) : body

	return (
		<Stack gap="xs">
			<Text size="sm" fw={ 500 }>{ t("messaging.form.preview") }</Text>
			<Box className={ clsx(classes.pane) }>
				{ previewBody.length > 0
					? (
						<Text className={ clsx(classes.bubble) } size="sm">
							{ previewBody }
						</Text>
					)
					: (
						<Text size="sm" className={ clsx(classes.empty) }>
							{ t("messaging.form.preview_empty") }
						</Text>
					) }
			</Box>
		</Stack>
	)
}
