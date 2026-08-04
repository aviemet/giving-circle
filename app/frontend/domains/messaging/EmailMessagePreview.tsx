import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, DangerousHtml, Stack, Text } from "@/components"
import { useFormField } from "@/components/Form"
import { usePageProps } from "@/lib/hooks"
import { messagingPreviewValues, renderMessagingPreview } from "@/lib/messaging/previewRender"
import { useMockCircle } from "@/queries"

import * as classes from "./EmailMessagePreview.css"

export interface EmailMessagePreviewProps {
	fieldPrefix: "presentation_message" | "message_template"
}

export function EmailMessagePreview({ fieldPrefix }: EmailMessagePreviewProps) {
	const { t } = useTranslation()
	const { app_url } = usePageProps()
	const { data: mockCircle } = useMockCircle()
	const [subjectValue] = useFormField(`${fieldPrefix}.subject`)
	const [bodyValue] = useFormField(`${fieldPrefix}.body`)
	const subject = typeof subjectValue === "string" ? subjectValue : ""
	const body = typeof bodyValue === "string" ? bodyValue : ""
	const hasContent = subject.length > 0 || body.length > 0
	const previewValues = mockCircle ? messagingPreviewValues(mockCircle, app_url) : undefined
	const previewSubject = previewValues ? renderMessagingPreview(subject, previewValues) : subject
	const previewBody = previewValues ? renderMessagingPreview(body, previewValues) : body

	return (
		<Stack gap="xs">
			<Text size="sm" fw={ 500 }>{ t("messaging.form.preview") }</Text>
			<Box className={ clsx(classes.pane) }>
				{ hasContent
					? (
						<>
							{ previewSubject.length > 0 && (
								<Text className={ clsx(classes.subject) } fw={ 600 }>
									{ previewSubject }
								</Text>
							) }
							{ previewBody.length > 0
								? (
									<DangerousHtml className={ clsx(classes.body) }>
										{ previewBody }
									</DangerousHtml>
								)
								: (
									<Text size="sm" className={ clsx(classes.empty) }>
										{ t("messaging.form.preview_empty") }
									</Text>
								) }
						</>
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
