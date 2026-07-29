import { useTranslation } from "react-i18next"

import { Page, Section, Title } from "@/components"
import { InteractionConfigTemplatesTable } from "@/domains/interactionConfigTemplates/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface InteractionConfigTemplatesIndexProps {
	interaction_config_templates: Schema.InteractionConfigTemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /settings/:circle_slug/interaction_templates
// @route: settingsInteractionTemplates
const InteractionConfigTemplatesIndex = ({
	interaction_config_templates,
	pagination,
	circle,
}: InteractionConfigTemplatesIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"settingsInteractionTemplates">()
	const title = t("interaction_config_templates.index.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
			breadcrumbs={ [
				{ title: t("interaction_config_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<IndexTableTemplate
					model="interaction_config_templates"
					pagination={ pagination }
					contextMenu={ {
						deleteRoute: Routes.settingsInteractionTemplates(circle.slug),
						options: [
							{
								label: t("interaction_config_templates.index.newTemplate"),
								href: Routes.newSettingsInteractionTemplate(circle.slug),
							},
						],
					} }
				>
					<InteractionConfigTemplatesTable
						records={ interaction_config_templates }
						pagination={ pagination }
						model="interaction_config_templates"
					/>
				</IndexTableTemplate>
			</Section>
		</Page>
	)
}

export default InteractionConfigTemplatesIndex
