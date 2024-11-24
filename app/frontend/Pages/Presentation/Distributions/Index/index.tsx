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

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_distributions
// @route: themePresentationDistributions
const PresentationDistributionsIndex = ({ presentation_distributions, pagination }: PresentationDistributionIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<'themePresentationDistributions'>()
	const title = 'Distribution'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newThemePresentationDistribution(params.circle_slug, params.theme_slug, params.presentation_slug) } icon={ <NewIcon /> }>
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

					{
						label: 'New Distribution',
						href: Routes.newThemePresentationDistribution(params.circle_slug, params.theme_slug, params.presentation_slug),
						icon: NewIcon ,
						deleteRoute: Routes.themePresentationDistributions(params.circle_slug, params.theme_slug, params.presentation_slug),
					}

				}
			>
				<PresentationDistributionsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationDistributionsIndex
