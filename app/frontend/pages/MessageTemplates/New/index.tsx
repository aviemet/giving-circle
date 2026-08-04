import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { MessageTemplateForm } from "@/domains/messageTemplates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewMessageTemplateProps {
	message_template: Schema.MessageTemplatesFormData
}

// @path: /settings/:circle_slug/message_templates/new
// @route: newSettingsMessageTemplate
const NewMessageTemplate = ({ message_template }: NewMessageTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"newSettingsMessageTemplate">()
	const title = t("message_templates.new.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("message_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{
					title: t("message_templates.index.breadcrumbs.templates"),
					href: Routes.settingsMessageTemplates(params.circle_slug),
				},
				{ title, href: window.location.href },
			] }
		>
			<Container>
				<Section>
					<MessageTemplateForm
						to={ Routes.settingsMessageTemplates(params.circle_slug) }
						message_template={ message_template }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default NewMessageTemplate
