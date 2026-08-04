import { useTranslation } from "react-i18next"

import { Page, Section, Title } from "@/components"
import { IntegrationsTable } from "@/domains/settings/integrations/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface IntegrationsIndexProps {
	integrations: Schema.IntegrationsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

// @path: /settings/:circle_slug/integrations
// @route: settingsIntegrations
const IntegrationsIndex = ({
	integrations,
	pagination,
	circle,
}: IntegrationsIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"settingsIntegrations">()
	const title = t("integrations.index.title")

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
					model="integrations"
					pagination={ pagination }
					contextMenu={ {
						deleteRoute: Routes.settingsIntegrations(circle.slug),
						options: [
							{
								label: t("integrations.index.newIntegration"),
								href: Routes.newSettingsIntegration(circle.slug),
							},
						],
					} }
				>
					<IntegrationsTable
						records={ integrations }
						pagination={ pagination }
						model="integrations"
					/>
				</IndexTableTemplate>
			</Section>
		</Page>
	)
}

export default IntegrationsIndex
