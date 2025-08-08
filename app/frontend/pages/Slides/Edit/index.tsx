import { Data } from "@measured/puck"

import { Page, Section } from "@/components"
import VisualEditor from "@/components/VisualEditor"
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
	const { toggleSidebarOpen } = useLayoutStore()

	const updateSlideMutation = useUpdateTemplateSlide({
		params: { circleSlug: params.circle_slug, templateSlug: params.template_slug },
	})

	const handleSave = async(data: Data) => {
		// await updateSlideMutation.mutateAsync({ id: slide.id, slide: data })
	}

	const title = `Slide Editor - ${slide?.title}`

	useInit(() => {
		toggleSidebarOpen(false)
	})

	return (
		<Page title={ title }>
			<Section>
				<VisualEditor
					initialData={ slide?.data || {} }
					onSave={ handleSave }
					isSaving={ updateSlideMutation.isPending }
				/>
			</Section>
		</Page>
	)
}

export default EditSlides
