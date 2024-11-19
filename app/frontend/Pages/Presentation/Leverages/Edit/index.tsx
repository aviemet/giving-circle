import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationLeveragesForm from '../Form'

interface EditPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesEdit
}

const EditPresentationLeverage = ({ presentation_leverage }: EditPresentationLeverageProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Edit Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverages', href: Routes.presentationLeverages() },
			{ title: "PresentationLeverage", href: Routes.presentationLeverage(presentation_leverage.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<PresentationLeveragesForm
					method='put'
					to={ Routes.presentationLeverage() }
					presentation_leverage={ presentation_leverage }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentationLeverage
