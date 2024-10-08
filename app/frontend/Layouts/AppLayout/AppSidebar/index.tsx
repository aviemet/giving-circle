import React from 'react'
import {
	AppShell,
	Divider,
	Flex,
} from '@/Components'
import { ToggleNavbarButton } from '@/Features'
import { ToggleColorSchemeButton } from '@/Components/Button'
import CircleDropdownLink from './CircleDropdownLink'
import Menu from './Menu'

import cx from 'clsx'
import * as classes from '../AppLayout.css'

const AppSidebar = () => {
	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" mb="sm">

					<ToggleColorSchemeButton />
					<ToggleNavbarButton />
				</Flex>

				{ /* Circle title and avatar */ }
				{ /* <Flex>
					<CircleDropdownLink />
				</Flex> */ }
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
