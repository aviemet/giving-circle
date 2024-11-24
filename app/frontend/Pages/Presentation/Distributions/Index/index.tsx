import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import PresentationDistributionsTable from '../Table'

interface PresentationDistributionIndexProps {
	presentation_distributions: Schema.PresentationDistributionsIndex[]
	pagination: Schema.Pagination
}

const PresentationDistributionsIndex = ({ presentation_distributions, pagination }: PresentationDistributionIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = 'Distribution'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationDistribution() } icon={ <NewIcon /> }>
						New Distribution
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				title="PresentationDistributions"
				model="presentation_distributions"
				rows={ presentation_distributions }
				pagination={ pagination }
				contextMenu={
					[
						{
							label: 'New Distribution',
							href: Routes.newPresentationDistribution(),
							icon: NewIcon ,
							deleteRoute: Routes.presentationDistributions(),
						},
					]
				}
			>
				<PresentationDistributionsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationDistributionsIndex
