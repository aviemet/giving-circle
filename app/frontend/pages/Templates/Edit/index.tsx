import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { TemplateForm } from "@/domains/templates/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditTemplateProps {
	template: Schema.TemplatesEdit
}

// @path: /:circle_slug/templates/:slug/edit
// @route: editCircleTemplate
const EditTemplate = ({ template }: EditTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"editCircleTemplate">()

	const title = t("templates.edit.title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("templates.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("templates.index.breadcrumbs.templates"), href: Routes.circleTemplates(params.circle_slug) },
				{ title: t("common.actions.edit_breadcrumb"), href: window.location.href },
			] }
		>
			<Section>
				<TemplateForm
					method="put"
					to={ Routes.circleTemplate(template.circle.slug, template.slug) }
					template={ template }
				/>
			</Section>
		</Page>
	)
}

export default EditTemplate
