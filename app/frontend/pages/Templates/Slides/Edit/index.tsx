import { useMemo } from "react"

import { Page, Section } from "@/components"
import VisualEditor from "@/components/VisualEditor"
import { useInit, usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

interface EditTemplatesSlidesProps {
	template: Schema.TemplatesFormData
}

// @path: /:circle_slug/templates/:template_slug/slides/:id/edit
// @route: circleTemplatesEditSlide
const EditTemplatesSlides = ({ template }: EditTemplatesSlidesProps) => {
	const { params } = usePageProps<"circleTemplatesEditSlide">()
	const { toggleSidebarOpen } = useLayoutStore()

	const slide = useMemo(() => {
		const slideId = parseInt(params.id)
		return template.slides.find(el => el.id = slideId)
	}, [params.id, template.slides])

	const title = `Slide Editor - ${slide.name}`

	useInit(() => {
		toggleSidebarOpen(false)
	})

	return (
		<Page title={ title }>
			<Section>
				<VisualEditor />
			</Section>
		</Page>
	)
}

export default EditTemplatesSlides
