import React from 'react'
import { Group, Menu, Page, Section } from '@/components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationDistributionProps {
	presentation_distribution: Schema.PresentationDistributionsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id
// @route: themePresentationsDistribution
const ShowPresentationDistribution = ({ presentation_distribution }: ShowPresentationDistributionProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title =  'PresentationDistribution'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Distribution', href: Routes.presentationDistributions() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationDistribution(presentation_distribution.id) }>
								Edit PresentationDistribution
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationDistribution
