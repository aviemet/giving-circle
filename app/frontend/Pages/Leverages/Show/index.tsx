import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowLeverageProps {
	leverage: Schema.LeveragesShow
}

const ShowLeverage = ({ leverage }: ShowLeverageProps) => {
	const title =  'Leverage'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Leverage', href: Routes.leverages() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editLeverage(leverage.id) }>
								Edit Leverage
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowLeverage
