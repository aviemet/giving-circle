import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { PresentationForm } from "@/domains/presentations/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface SettingsPresentationProps {
	presentation: Schema.PresentationsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/settings
// @route: themePresentationSettings
const SettingsPresentation = ({ presentation }: SettingsPresentationProps) => {
	const { t } = useTranslation()
	const { params, active_circle, active_theme, active_presentation } = usePageProps<"themePresentationSettings">()

	const title = t("presentations.settings.title")

	if(!active_circle || !active_theme || !active_presentation) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: t("presentations.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("presentations.index.breadcrumbs.themes"), href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: t("presentations.index.breadcrumbs.presentations"), href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title: active_presentation.name, href: Routes.themePresentation(params.circle_slug, params.theme_slug, params.presentation_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<PresentationForm
					method="put"
					to={ Routes.themePresentation(params.circle_slug, params.theme_slug, params.presentation_slug) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default SettingsPresentation
