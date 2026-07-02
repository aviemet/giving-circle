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
	const { params, active_circle, active_theme, active_presentation } = usePageProps<"themePresentationSettings">()

	const title = "Settings"

	if(!active_circle || !active_theme || !active_presentation) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Themes", href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: "Presentations", href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title: active_presentation.name, href: Routes.themePresentation(params.circle_slug, params.theme_slug, params.presentation_slug) },
				{ title: "Settings", href: window.location.href },
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
