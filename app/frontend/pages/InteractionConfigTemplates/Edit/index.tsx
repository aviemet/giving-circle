import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { InteractionConfigTemplateForm } from "@/domains/interactionConfigTemplates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditInteractionConfigTemplateProps {
	interaction_config_template: Schema.InteractionConfigTemplatesEdit
}

// @path: /:circle_slug/interaction_templates/:slug/edit
// @route: editCircleInteractionTemplate
const EditInteractionConfigTemplate = ({ interaction_config_template }: EditInteractionConfigTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editCircleInteractionTemplate">()
	const title = t("interaction_config_templates.edit.title", { name: interaction_config_template.name })

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("interaction_config_templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{
					title: t("interaction_config_templates.index.breadcrumbs.templates"),
					href: Routes.circleInteractionTemplates(params.circle_slug),
				},
				{ title: interaction_config_template.name, href: window.location.href },
			] }
		>
			<Section>
				<InteractionConfigTemplateForm
					to={ Routes.circleInteractionTemplate(params.circle_slug, params.slug) }
					method="put"
					interaction_config_template={ interaction_config_template }
				/>
			</Section>
		</Page>
	)
}

export default EditInteractionConfigTemplate
