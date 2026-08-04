import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { PresentationMessageForm } from "@/domains/presentation/messages/Form"
import { Routes, withLayout } from "@/lib"

interface EditPresentationMessageProps {
	presentation: Schema.PresentationsPersisted
	presentation_message: Schema.PresentationMessagesEdit
	circle: Schema.CirclesPersisted
	theme: Schema.ThemesPersisted
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug/edit
// @route: editThemePresentationMessage
const EditPresentationMessage = ({
	presentation,
	presentation_message,
	circle,
	theme,
}: EditPresentationMessageProps) => {
	const { t } = useTranslation()
	const title = t("presentation_messages.edit.title", { name: presentation_message.name })

	return (
		<Page title={ title }>
			<Container>
				<Section>
					<PresentationMessageForm
						to={ Routes.themePresentationMessage(circle.slug, theme.slug, presentation.slug, presentation_message.slug) }
						method="put"
						presentation_message={ presentation_message }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default withLayout(EditPresentationMessage, "app")
