import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowPresentationLeverageProps {
	presentation_leverage: Schema.PresentationLeveragesShow
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id
// @route: circleThemePresentationLeverage
const ShowPresentationLeverage = ({ presentation_leverage }: IShowPresentationLeverageProps) => {
	const title =  'PresentationLeverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Presentation Leverage', href: Routes.presentationLeverages() },
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
