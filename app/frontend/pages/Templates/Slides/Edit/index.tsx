import { useState } from "react"

import { Page, Section } from "@/components"
import { VisualEditor, type SlideSaveExtras } from "@/components/VisualEditor"
import { slideTitleFromData, type PuckSlideData } from "@/components/VisualEditor/editorPersistence"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useUpdateTemplateSlide } from "@/queries"
import { useLayoutStore } from "@/store"

interface EditSlidesProps {
	template: Schema.TemplatesFormData
	slide: Schema.SlidesFormData
}

// @path: /settings/:circle_slug/templates/:template_slug/slides/:slug/edit
// @route: settingsTemplatesEditSlide
const EditSlides = ({ template, slide }: EditSlidesProps) => {
	const { params } = usePageProps<"settingsTemplatesEditSlide">()
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)
	const [slideTitle, setSlideTitle] = useState(slide?.title ?? slide?.slug ?? "")

	const returnTo = Routes.settingsTemplate(params.circle_slug, params.template_slug)

	const updateSlideMutation = useUpdateTemplateSlide({
		params: { circleSlug: params.circle_slug, templateSlug: params.template_slug, slideSlug: params.slug },
	})

	const handleSave = async (data: PuckSlideData, extras?: SlideSaveExtras) => {
		const title = slideTitleFromData(data) ?? slideTitle

		await updateSlideMutation.mutate({ data, title, thumbnail: extras?.thumbnail })
		setSlideTitle(title)
	}

	const title = `Slide Editor - ${slideTitle}`

	useInit(() => {
		toggleSidebarOpen(false)
	})

	return (
		<Page title={ title } disablePadding>
			<Section>
				<VisualEditor
					initialData={ slide?.data || {} }
					slideTitle={ slideTitle }
					onSave={ handleSave }
					isSaving={ updateSlideMutation.isPending }
					slideKey={ slide.slug ?? params.slug }
					returnTo={ returnTo }
				/>
			</Section>
		</Page>
	)
}

export default EditSlides
