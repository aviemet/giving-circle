import { Page, Section } from "@/components"
import PresentationElementForm from "@/features/presentation/elements/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationElementProps {
	presentation_element: Schema.PresentationElementsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/new
// @route: newThemePresentationsElement
const NewPresentationElement = ({ ...data }: NewPresentationElementProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"newThemePresentationsElement">()
	const title = "New Element"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Elements", href: Routes.presentationElements() },
			{ title: "New Element", href: window.location.href },
		] }>

			<Section>
				<PresentationElementForm
					to={ Routes.presentationElements() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationElement
