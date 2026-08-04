import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { IntegrationForm } from "@/domains/settings/integrations/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewIntegrationProps {
	integration: Schema.IntegrationsFormData
}

// @path: /settings/:circle_slug/integrations/new
// @route: newSettingsIntegration
const NewIntegration = ({ integration }: NewIntegrationProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"newSettingsIntegration">()
	const title = t("integrations.new.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("message_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("integrations.index.title"), href: Routes.settingsIntegrations(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Container>
				<Section>
					<IntegrationForm
						to={ Routes.settingsIntegrations(params.circle_slug) }
						integration={ integration }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default NewIntegration
