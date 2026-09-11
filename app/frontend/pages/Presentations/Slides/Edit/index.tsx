import { useState } from "react"

import { Page, Section } from "@/components"
import { VisualEditor, slideSaveExtras } from "@/components/VisualEditor"
import { slidePuckConfig } from "@/components/VisualEditor/config"
import { slideTitleFromData, type PuckSlideData } from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import { withStarterSlideContent } from "@/components/VisualEditor/lib/slotEditor"
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
	const [slideTitle, setSlideTitle] = useState(slide?.title ?? slide?.slug ?? "")

	const returnTo = Routes.themePresentationSlides(
		params.circle_slug,
		params.theme_slug,
		params.presentation_slug,
	)

	const updateSlideMutation = useUpdatePresentationSlide({
		params: { circleSlug: params.circle_slug, presentationSlug: params.presentation_slug, slideSlug: params.slug },
	})

	const handleSave = async (data: PuckSlideData) => {
		const title = slideTitleFromData(data) ?? slideTitle
		const extras = await slideSaveExtras()

		await updateSlideMutation.mutateAsync({ data, title, thumbnail: extras?.thumbnail })
		setSlideTitle(title)
	}

	const title = `Slide Editor - ${slideTitle}`

	useInit(() => {
		toggleSidebarOpen(false)

		return () => {
			toggleSidebarOpen()
		}
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
				{ title: slideTitle || "Edit", href: window.location.href },
			] }
		>
			<Section>
				<VisualEditor
					initialData={ withStarterSlideContent(slide?.data || {}) }
					slideTitle={ slideTitle }
					presentation={ active_presentation }
					onSave={ handleSave }
					slideKey={ slide.slug ?? params.slug }
					returnTo={ returnTo }
					puckConfig={ slidePuckConfig }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationSlides
