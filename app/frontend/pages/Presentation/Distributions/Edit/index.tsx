import { Page, Section } from "@/components"
import PresentationDistributionsForm from "@/features/presentation/distributions/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPresentationDistributionProps {
	distribution: Schema.PresentationDistributionsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id/edit
// @route: editThemePresentationsDistribution
const EditPresentationDistribution = ({ distribution }: EditPresentationDistributionProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"editThemePresentationsDistribution">()
	const title = "Edit Distribution"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Distributions", href: Routes.themePresentationDistributions(params.circle_slug, params.theme_slug, params.presentation_slug) },
			{ title: "PresentationDistribution", href: Routes.themePresentationDistribution(params.circle_slug, params.theme_slug, params.presentation_slug, distribution.id) },
			{ title, href: window.location.href },
		] }>
			<Section>
				<PresentationDistributionsForm
					method="put"
					to={ Routes.themePresentationDistribution(params.circle_slug, params.theme_slug, params.presentation_slug, distribution.id) }
					presentation_distribution={ distribution }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationDistribution
