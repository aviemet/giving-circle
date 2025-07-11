import { Title, Page, Section } from "@/components"
import PresentationForm from "@/features/presentations/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/new
// @route: newThemePresentation
const NewPresentation = ({ presentation }: NewPresentationProps) => {
	const { params } = usePageProps<"newThemePresentation">()

	const title = "New Presentation"

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<PresentationForm
					to={ Routes.themePresentations(params.circle_slug, params.theme_slug) }
					presentation={ presentation }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation
