import { Data } from "@measured/puck"

import { Page, Section } from "@/components"
import { VisualEditor } from "@/components/VisualEditor"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useUpdatePresentationSlide } from "@/queries"
import { useLayoutStore } from "@/store"

interface EditPresentationSlidesProps {
	presentation: Schema.PresentationsFormData
	slide: Schema.SlidesFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug/edit
// @route: editThemePresentationSlide
const EditPresentationSlides = ({ presentation, slide }: EditPresentationSlidesProps) => {
	const { params, active_circle, active_theme, active_presentation } = usePageProps<"editThemePresentationSlide">()
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)

	const returnTo = Routes.themePresentationSlides(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
	)

	const updateSlideMutation = useUpdatePresentationSlide({
		params: { circleSlug: params.circle_slug, presentationSlug: params.presentation_slug, slideSlug: params.slug },
	})

	const handleSave = async(data: Data) => {
		await updateSlideMutation.mutate({ data: data })
	}

	const title = `Slide Editor - ${slide?.title}`

	useInit(() => {
		toggleSidebarOpen(false)
	}, () => {
		toggleSidebarOpen()
	})

	if(!active_circle || !active_theme || !active_presentation) return <></>

	return (
		<Page
			title={ title }
			disablePadding
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Themes", href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: "Presentations", href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title: active_presentation.name, href: Routes.themePresentation(params.circle_slug, params.theme_slug, params.presentation_slug) },
				{ title: "Slides", href: returnTo },
				{ title: slide?.title ?? "Edit", href: window.location.href },
			] }
		>
			<Section>
				<VisualEditor
					initialData={ slide?.data || {} }
					onSave={ handleSave }
					isSaving={ updateSlideMutation.isPending }
					returnTo={ returnTo }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationSlides
