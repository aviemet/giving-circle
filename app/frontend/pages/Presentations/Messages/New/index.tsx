import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { PresentationMessageForm } from "@/domains/presentation/messages/Form"
import { Routes, withLayout } from "@/lib"

interface NewPresentationMessageProps {
	presentation: Schema.PresentationsPersisted
	presentation_message: Schema.PresentationMessagesFormData
	circle: Schema.CirclesPersisted
	theme: Schema.ThemesPersisted
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/new
// @route: newThemePresentationMessage
const NewPresentationMessage = ({
	presentation,
	presentation_message,
	circle,
	theme,
}: NewPresentationMessageProps) => {
	const { t } = useTranslation()
	const title = t("presentation_messages.new.title")

	return (
		<Page title={ title }>
			<Container>
				<Section>
					<PresentationMessageForm
						to={ Routes.themePresentationMessages(circle.slug, theme.slug, presentation.slug) }
						presentation_message={ presentation_message }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default withLayout(NewPresentationMessage, "app")
