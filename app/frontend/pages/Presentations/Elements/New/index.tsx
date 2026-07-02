import { Page, Section } from "@/components"
import { PresentationElementForm } from "@/domains/presentation/elements/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationElementProps {
	presentation_element: Schema.PresentationElementsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/new
// @route: newThemePresentationElement
const NewPresentationElement = ({ ...data }: NewPresentationElementProps) => {
	const { params } = usePageProps<"newThemePresentationElement">()
	const title = "New Element"

	return (
		<Page title={ title } breadcrumbs={ [
			{
				title: "Elements",
				href: Routes.themePresentationElements(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
				),
			},
			{ title: "New Element", href: window.location.href },
		] }>

			<Section>
				<PresentationElementForm
					to={ Routes.themePresentationElements(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationElement
