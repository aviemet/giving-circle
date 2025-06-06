import { Page, Section } from "@/components"
import PresentationDistributionForm from "@/features/presentation/distributions/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewPresentationDistributionProps {
	presentation_distribution: Schema.PresentationDistributionsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/new
// @route: newThemePresentationsDistribution
const NewPresentationDistribution = ({ ...data }: NewPresentationDistributionProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"newThemePresentationsDistribution">()
	const title = "New Distribution"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Distributions", href: Routes.presentationDistributions() },
			{ title: "New Distribution", href: window.location.href },
		] }>

			<Section>
				<PresentationDistributionForm
					to={ Routes.presentationDistributions() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationDistribution
