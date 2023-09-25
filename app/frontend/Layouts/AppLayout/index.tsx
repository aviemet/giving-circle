import React from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Box, Burger, Group, ScrollArea } from '@mantine/core'

const AppLayout = ({ children }: { children: any }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

	return (
		<AppShell
			layout="alt"
			header={ { height: 60 } }
			navbar={ {
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			} }
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={ mobileOpened } onClick={ toggleMobile } hiddenFrom="sm" size="sm" />
					<Burger opened={ desktopOpened } onClick={ toggleDesktop } visibleFrom="sm" size="sm" />
					<AppHeader />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<AppSidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				<Box component={ ScrollArea }>{ children }</Box>
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
