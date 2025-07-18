import { Page, Section } from "@/components"
import PresentationElementsForm from "@/features/presentation/elements/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationElementProps {
	presentation_element: Schema.PresentationElementsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:id/edit
// @route: editThemePresentationsElement
const EditPresentationElement = ({ presentation_element }: EditPresentationElementProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"editThemePresentationsElement">()
	const title = "Edit Element"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Elements", href: Routes.presentationElements() },
			{ title: "PresentationElement", href: Routes.presentationElement(presentation_element.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<PresentationElementsForm
					method="put"
					to={ Routes.presentationElement() }
					presentation_element={ presentation_element }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationElement
