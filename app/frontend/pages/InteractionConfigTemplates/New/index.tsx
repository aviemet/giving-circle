import { useTranslation } from "react-i18next"

import { Container, Page, Section } from "@/components"
import { InteractionConfigTemplateForm } from "@/domains/interactionConfigTemplates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewInteractionConfigTemplateProps {
	interaction_config_template: Schema.InteractionConfigTemplatesFormData
}

// @path: /settings/:circle_slug/interaction_templates/new
// @route: newSettingsInteractionTemplate
const NewInteractionConfigTemplate = ({ interaction_config_template }: NewInteractionConfigTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"newSettingsInteractionTemplate">()
	const title = t("interaction_config_templates.new.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("interaction_config_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{
					title: t("interaction_config_templates.index.breadcrumbs.templates"),
					href: Routes.settingsInteractionTemplates(params.circle_slug),
				},
				{ title, href: window.location.href },
			] }
		>
			<Container>
				<Section>
					<InteractionConfigTemplateForm
						to={ Routes.settingsInteractionTemplates(params.circle_slug) }
						interaction_config_template={ interaction_config_template }
					/>
				</Section>
			</Container>
		</Page>
	)
}

export default NewInteractionConfigTemplate
