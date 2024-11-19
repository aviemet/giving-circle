import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import PresentationLeveragesTable from '../Table'

interface PresentationLeverageIndexProps {
	presentation_leverages: Schema.PresentationLeveragesIndex[]
	pagination: Schema.Pagination
}

const PresentationLeveragesIndex = ({ presentation_leverages, pagination }: PresentationLeverageIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = Leverage

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationLeverage() } icon={ <NewIcon /> }>
						New Leverage
					</Menu.Link>
				</Menu>
			</> }
		>
		<IndexTableTemplate
			title="PresentationLeverages"
			model="presentation_leverages"
			rows={ presentation_leverages }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.presentationLeverages(),
				[
					{ label: 'New Leverage', href: Routes.newPresentationLeverage(), icon: NewIcon },
				]
			} }
		>
			<PresentationLeveragesTable />
		</IndexTableTemplate>
		</Page>
	)
}

export default PresentationLeveragesIndex
