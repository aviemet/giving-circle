import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { IntegrationForm } from "@/domains/settings/integrations/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditIntegrationProps {
	integration: Schema.IntegrationsEdit
}

// @path: /settings/:circle_slug/integrations/:id/edit
// @route: editSettingsIntegration
const EditIntegration = ({ integration }: EditIntegrationProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editSettingsIntegration">()
	const title = t("integrations.edit.title", { name: integration.name })

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
						to={ Routes.settingsIntegration(params.circle_slug, integration.id) }
						method="put"
						integration={ integration }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default EditIntegration
