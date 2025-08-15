import { Data } from "@measured/puck"

import { Page, Section } from "@/components"
import VisualEditor from "@/components/VisualEditor"
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
	const { params } = usePageProps<"editThemePresentationSlide">()
	const { toggleSidebarOpen } = useLayoutStore()

	const updateSlideMutation = useUpdatePresentationSlide({
		params: { circleSlug: params.circle_slug, presentationSlug: params.presentation_slug, slideSlug: params.slug },
	})

	const handleSave = async(data: Data) => {
		await updateSlideMutation.mutate({ data: data },
			{
				onError(error, variables, context) {
					console.log("Error", { error, variables, context })
				},
				onSuccess(data, variables, context) {
					console.log("Success", { data, variables, context })
				},
			}
		)
	}

	const title = `Slide Editor - ${slide?.title}`

	useInit(() => {
		toggleSidebarOpen(false)
	}, () => {
		toggleSidebarOpen()
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

export default EditPresentationSlides
