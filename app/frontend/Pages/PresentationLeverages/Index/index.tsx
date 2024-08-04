import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationLeveragesTable from '../Table'

interface PresentationLeverageIndexProps {
	presentation_leverages: Schema.PresentationLeveragesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages
// @route: circleThemePresentationLeverages
const PresentationLeveragesIndex = ({ presentation_leverages, pagination }: PresentationLeverageIndexProps) => {
	return (
		<IndexTableTemplate
			title="PresentationLeverages"
			model="presentation_leverages"
			rows={ presentation_leverages }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.presentationLeverages(),
				[
					{ label: 'New Presentation Leverage', href: Routes.newPresentationLeverage(), icon: NewIcon },
				]
			} }
		>
			<PresentationLeveragesTable />
		</IndexTableTemplate>
	)
}

export default PresentationLeveragesIndex
