import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesShow
}

const ShowPresentationLeverage = ({ presentation_leverage }: ShowPresentationLeverageProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title =  'PresentationLeverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverage', href: Routes.presentationLeverages() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationLeverage(presentation_leverage.id) }>
								Edit PresentationLeverage
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationLeverage
