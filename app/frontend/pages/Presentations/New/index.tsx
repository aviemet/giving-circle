import { Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationForm from "@/features/presentations"


interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/new
// @route: newThemePresentation
const NewPresentation = ({ presentation }: NewPresentationProps) => {
	const { params, active_circle, active_theme } = usePageProps<"newThemePresentation">()

	const title = "New Presentation"

	if(!active_circle || !active_theme) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Themes", href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: "Presentations", href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title: "New", href: window.location.href },
			] }
		>
			<Section>
				<PresentationForm
					to={ Routes.themePresentations(params.circle_slug, params.theme_slug) }
					presentation={ presentation }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
