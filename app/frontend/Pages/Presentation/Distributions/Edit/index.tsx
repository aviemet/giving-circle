import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationDistributionsForm from '../Form'

interface EditPresentationDistributionProps {
	presentation_distribution: Schema.PresentationDistributionsEdit
}

const EditPresentationDistribution = ({ presentation_distribution }: EditPresentationDistributionProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Distribution'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Distributions', href: Routes.presentationDistributions() },
			{ title: "PresentationDistribution", href: Routes.presentationDistribution(presentation_distribution.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<PresentationDistributionsForm
					method='put'
					to={ Routes.presentationDistribution() }
					presentation_distribution={ presentation_distribution }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationDistribution
