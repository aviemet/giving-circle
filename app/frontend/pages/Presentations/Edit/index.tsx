import { Page, Section } from "@/components"
import { PresentationForm } from "@/domains/presentations/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationProps {
	presentation: Schema.PresentationsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:slug/edit
// @route: editThemePresentation
const EditPresentation = ({ presentation }: EditPresentationProps) => {
	const { params } = usePageProps<"editThemePresentation">()

	const title = "Edit Presentation"

	return (
		<Page
			title={ title }
		>
			<Section>
				<PresentationForm
					method="put"
					to={ Routes.themePresentation(params.circle_slug, params.theme_slug, presentation.slug) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation
