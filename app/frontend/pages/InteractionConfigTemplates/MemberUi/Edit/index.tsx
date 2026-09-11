import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { VisualEditor } from "@/components/VisualEditor"
import { memberPuckConfig } from "@/components/VisualEditor/config"
import { type PuckSlideData } from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import {
	MemberUiPreviewSourceProvider,
	memberUiPuckData,
	persistMemberUi,
} from "@/features/presentation/interactions/memberUi"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

interface EditInteractionTemplateMemberUiProps {
	interaction_config_template: Schema.InteractionConfigTemplatesEdit
}

// @path: /settings/:circle_slug/interaction_templates/:slug/member_ui/edit
// @route: editMemberUiSettingsInteractionTemplate
const EditInteractionTemplateMemberUi = ({
	interaction_config_template,
}: EditInteractionTemplateMemberUiProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"editMemberUiSettingsInteractionTemplate">()
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)
	const returnTo = Routes.editSettingsInteractionTemplate(params.circle_slug, params.slug)
	const title = interaction_config_template.name
	const saveUrl = Routes.settingsInteractionTemplate(params.circle_slug, params.slug)

	useInit(() => {
		toggleSidebarOpen(false)

		return () => {
			toggleSidebarOpen()
		}
	})

	const handleSave = async (data: PuckSlideData) => {
		await persistMemberUi(saveUrl, "interaction_config_template", data)
	}

	return (
		<Page
			title={ t("presentations.interactions.member_ui.editor.title", { name: title }) }
			disablePadding
			breadcrumbs={ [
				{ title: t("interaction_config_templates.index.title"), href: Routes.settingsInteractionTemplates(params.circle_slug) },
				{ title, href: returnTo },
				{ title: t("presentations.interactions.member_ui.editor.breadcrumb"), href: window.location.href },
			] }
		>
			<Section>
				<MemberUiPreviewSourceProvider
					value={ {
						id: interaction_config_template.id ?? params.slug,
						name: interaction_config_template.name,
						slug: params.slug,
						config: interaction_config_template.config,
						interaction_ui_template: interaction_config_template.interaction_ui_template ?? {
							id: "template-ui",
							slug: "custom",
							name: interaction_config_template.name,
						},
					} }
				>
					<VisualEditor
						initialData={ memberUiPuckData(interaction_config_template.member_ui) }
						onSave={ handleSave }
						slideKey={ `interaction-template-${params.slug}-member-ui` }
						returnTo={ returnTo }
						puckConfig={ memberPuckConfig }
					/>
				</MemberUiPreviewSourceProvider>
			</Section>
		</Page>
	)
}

export default EditInteractionTemplateMemberUi
