import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import PresentationLeveragesTable from '../Table'
import { Menu, Page, Title } from '@/Components'
import { usePageProps } from '@/lib/hooks'

interface PresentationLeverageIndexProps {
	presentation_leverages: Schema.PresentationLeveragesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages
// @route: circleThemePresentationLeverages
const PresentationLeveragesIndex = ({ presentation_leverages, pagination }: PresentationLeverageIndexProps) => {
	const { params } = usePageProps<'circleThemePresentationLeverages'>()
	const title = "Leverages"

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newCircleThemePresentationLeverage(params.circle_slug, params.theme_slug, params.presentation_slug) } icon={ <NewIcon /> }>
						New Leverage
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				model="presentation_leverages"
				rows={ presentation_leverages }
				pagination={ pagination }
			>
				<PresentationLeveragesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationLeveragesIndex
