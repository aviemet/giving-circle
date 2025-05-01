import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationDistributionsTable from "../Table"

interface PresentationDistributionIndexProps {
	presentation_distributions: Schema.PresentationDistributionsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions
// @route: themePresentationsDistributions
const PresentationDistributionsIndex = ({ presentation_distributions, pagination }: PresentationDistributionIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"themePresentationDistributions">()
	const title = "Distribution"

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
						label: "New Distribution",
						href: Routes.newThemePresentationDistribution(params.circle_slug, params.theme_slug, params.presentation_slug),
						icon: NewIcon,
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
