import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import LeverageForm from '../Form'

interface NewLeverageProps {
	leverage: Schema.LeveragesFormData
}

const NewLeverage = ({ ...data }: NewLeverageProps) => {
	const title = 'New Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverages', href: Routes.leverages() },
			{ title: 'New Leverage', href: window.location.href },
		] }>

			<Section>
				<LeverageForm
					to={ Routes.leverages() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewLeverage
