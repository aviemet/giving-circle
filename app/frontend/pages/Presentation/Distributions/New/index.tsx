import React from "react"

import { Page, Section } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationDistributionForm from "../Form"

interface NewPresentationDistributionProps {
	presentation_distribution: Schema.PresentationDistributionsFormData
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/new
// @route: newThemePresentationsDistribution
const NewPresentationDistribution = ({ ...data }: NewPresentationDistributionProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"">()
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
