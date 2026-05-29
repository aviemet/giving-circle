import { Data } from "@measured/puck"

import { Page, Section } from "@/components"
import { VisualEditor } from "@/components/VisualEditor"
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

	const returnTo = Routes.circleTemplate(params.circle_slug, params.template_slug)

	const updateSlideMutation = useUpdateTemplateSlide({
		params: { circleSlug: params.circle_slug, templateSlug: params.template_slug, slideSlug: params.slug },
	})

	const handleSave = async(data: Data) => {
		await updateSlideMutation.mutate({ data: data })
	}

	const title = `Slide Editor - ${slide?.title}`

	useInit(() => {
		toggleSidebarOpen(false)
	})

	return (
		<Page title={ title } disablePadding>
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

export default EditSlides
