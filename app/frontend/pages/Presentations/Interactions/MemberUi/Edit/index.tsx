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

interface EditPresentationInteractionMemberUiProps {
	presentation_interaction: Schema.PresentationInteractionsEdit
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug/member_ui/edit
// @route: editMemberUiThemePresentationInteraction
const EditPresentationInteractionMemberUi = ({
	presentation_interaction,
	presentation,
}: EditPresentationInteractionMemberUiProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"editMemberUiThemePresentationInteraction">()
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)
	const returnTo = Routes.editThemePresentationInteraction(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
		params.slug,
	)
	const title = presentation_interaction.name
	const saveUrl = Routes.themePresentationInteraction(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
		params.slug,
	)

	useInit(() => {
		toggleSidebarOpen(false)

		return () => {
			toggleSidebarOpen()
		}
	})

	const handleSave = async (data: PuckSlideData) => {
		await persistMemberUi(saveUrl, "presentation_interaction", data)
	}

	return (
		<Page
			title={ t("presentations.interactions.member_ui.editor.title", { name: title }) }
			disablePadding
			breadcrumbs={ [
				{
					title: t("presentations.interactions.index.title"),
					href: Routes.themePresentationInteractions(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					),
				},
				{ title, href: returnTo },
				{ title: t("presentations.interactions.member_ui.editor.breadcrumb"), href: window.location.href },
			] }
		>
			<Section>
				<MemberUiPreviewSourceProvider
					value={ {
						id: presentation_interaction.id ?? params.slug,
						name: presentation_interaction.name,
						slug: params.slug,
						config: presentation_interaction.config,
						interaction_ui_template: presentation_interaction.interaction_ui_template,
					} }
				>
					<VisualEditor
						initialData={ memberUiPuckData(presentation_interaction.member_ui) }
						presentation={ presentation }
						onSave={ handleSave }
						slideKey={ `presentation-interaction-${params.slug}-member-ui` }
						returnTo={ returnTo }
						puckConfig={ memberPuckConfig }
					/>
				</MemberUiPreviewSourceProvider>
			</Section>
		</Page>
	)
}

export default EditPresentationInteractionMemberUi
