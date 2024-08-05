import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import LeveragesForm from '../Form'

interface EditLeverageProps {
	leverage: Schema.LeveragesEdit
}

const EditLeverage = ({ leverage }: EditLeverageProps) => {
	const title = 'Edit Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverages', href: Routes.leverages() },
			{ title: "Leverage", href: Routes.leverage(leverage.id) },
			{ title, href: window.location.href },
		] }>
			<Section>				
				<LeveragesForm
					method='put'
					to={ Routes.leverage() }
					leverage={ leverage }
				/>
			</Section>
		</Page>
	)
}

export default EditLeverage
