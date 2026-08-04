import { useTranslation } from "react-i18next"

import { Page, Section, Title } from "@/components"
import { MessageTemplatesTable } from "@/domains/messageTemplates/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface MessageTemplatesIndexProps {
	message_templates: Schema.MessageTemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /settings/:circle_slug/message_templates
// @route: settingsMessageTemplates
const MessageTemplatesIndex = ({
	message_templates,
	pagination,
	circle,
}: MessageTemplatesIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"settingsMessageTemplates">()
	const title = t("message_templates.index.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
			breadcrumbs={ [
				{ title: t("message_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<IndexTableTemplate
					model="message_templates"
					pagination={ pagination }
					contextMenu={ {
						deleteRoute: Routes.settingsMessageTemplates(circle.slug),
						options: [
							{
								label: t("message_templates.index.newTemplate"),
								href: Routes.newSettingsMessageTemplate(circle.slug),
							},
						],
					} }
				>
					<MessageTemplatesTable
						records={ message_templates }
						pagination={ pagination }
						model="message_templates"
					/>
				</IndexTableTemplate>
			</Section>
		</Page>
	)
}

export default MessageTemplatesIndex
