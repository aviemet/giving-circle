import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import PresentationLeverageForm from '../Form'

interface NewPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesFormData
}

const NewPresentationLeverage = ({ ...data }: NewPresentationLeverageProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'New Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverages', href: Routes.presentationLeverages() },
			{ title: 'New Leverage', href: window.location.href },
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
