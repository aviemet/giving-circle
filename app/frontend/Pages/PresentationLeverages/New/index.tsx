import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationLeverageForm from '../Form'

interface INewPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesFormData
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/new
// @route: newCircleThemePresentationLeverage
const NewPresentationLeverage = ({ ...data }: INewPresentationLeverageProps) => {
	const title = 'New Presentation Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Leverages', href: Routes.presentationLeverages() },
			{ title: 'New Presentation Leverage', href: window.location.href },
		] }>

			<Section>
				<PresentationLeverageForm
					to={ Routes.presentationLeverages() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentationLeverage
