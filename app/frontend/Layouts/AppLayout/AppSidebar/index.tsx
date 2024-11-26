import React from 'react'
import {
	AppShell,
	Divider,
	Flex,
} from '@/Components'
import { ToggleNavbarButton } from '@/Features'
import CircleDropdownLink from './CircleDropdownLink'
import Menu from './Menu'

const AppSidebar = () => {
	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" align="center" mx="xs">
					{ /* Circle title and avatar */ }
					<CircleDropdownLink />
					<ToggleNavbarButton />
				</Flex>

			</AppShell.Section>

			<Divider />

			{ /* Nav menu portal */ }
			<AppShell.Section grow>
				<Menu />
			</AppShell.Section>

			<Divider />

			{ /* Sticky nav links */ }
			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar
