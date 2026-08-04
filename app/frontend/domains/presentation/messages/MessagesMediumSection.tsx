import { useTranslation } from "react-i18next"

import { ButtonLink, Stack, Table, Title } from "@/components"
import { Routes } from "@/lib"
import { presentationMessageMediumLabel } from "@/lib/messaging/labels"

export interface MessagesMediumSectionProps {
	medium: "email" | "sms"
	messages: Schema.PresentationMessagesIndex[]
	circleSlug: string
	themeSlug: string
	presentationSlug: string
}

export function MessagesMediumSection({
	medium,
	messages,
	circleSlug,
	themeSlug,
	presentationSlug,
}: MessagesMediumSectionProps) {
	const { t } = useTranslation()

	if(messages.length === 0) return null

	return (
		<Stack gap="sm">
			<Title order={ 3 }>{ presentationMessageMediumLabel(medium) }</Title>
			<Table>
				<Table.Head>
					<Table.Row>
						<Table.HeadCell>{ t("presentation_messages.index.columns.name") }</Table.HeadCell>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{ messages.map((message) => (
						<Table.Row key={ message.id }>
							<Table.Cell>
								<ButtonLink
									href={ Routes.editThemePresentationMessage(circleSlug, themeSlug, presentationSlug, message.slug) }
									variant="subtle"
								>
									{ message.name }
								</ButtonLink>
							</Table.Cell>
						</Table.Row>
					)) }
				</Table.Body>
			</Table>
		</Stack>
	)
}
