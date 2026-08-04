import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { MessageTemplateForm } from "@/domains/messageTemplates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditMessageTemplateProps {
	message_template: Schema.MessageTemplatesEdit
}

// @path: /settings/:circle_slug/message_templates/:slug/edit
// @route: editSettingsMessageTemplate
const EditMessageTemplate = ({ message_template }: EditMessageTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editSettingsMessageTemplate">()
	const title = t("message_templates.edit.title", { name: message_template.name })

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
						to={ Routes.settingsMessageTemplate(params.circle_slug, message_template.slug) }
						method="put"
						message_template={ message_template }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default EditMessageTemplate
