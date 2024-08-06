import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationLeveragesForm from '../Form'

interface EditPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesEdit
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id/edit
// @route: editCircleThemePresentationLeverage
const EditPresentationLeverage = ({ presentation_leverage }: EditPresentationLeverageProps) => {
	const title = 'Edit Presentation Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Leverages', href: Routes.presentationLeverages() },
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
