import { Data } from "@measured/puck"
import { useState } from "react"

import { Page, Section } from "@/components"
import { VisualEditor } from "@/components/VisualEditor"
import { slideTitleFromData } from "@/components/VisualEditor/editorPersistence"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useUpdateTemplateSlide } from "@/queries"
import { useLayoutStore } from "@/store"

interface EditSlidesProps {
	template: Schema.TemplatesFormData
	slide: Schema.SlidesFormData
}

// @path: /:circle_slug/templates/:template_slug/slides/:slug/edit
// @route: circleTemplatesEditSlide
const EditSlides = ({ template, slide }: EditSlidesProps) => {
	const { params } = usePageProps<"circleTemplatesEditSlide">()
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)
	const [slideTitle, setSlideTitle] = useState(slide?.title ?? slide?.slug ?? "")

	const returnTo = Routes.circleTemplate(params.circle_slug, params.template_slug)

	const updateSlideMutation = useUpdateTemplateSlide({
		params: { circleSlug: params.circle_slug, templateSlug: params.template_slug, slideSlug: params.slug },
	})

	const handleSave = async(data: Data) => {
		const title = slideTitleFromData(data) ?? slideTitle

		await updateSlideMutation.mutate({ data, title })
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
