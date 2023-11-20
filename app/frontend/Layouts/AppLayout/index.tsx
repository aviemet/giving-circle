import React, { useState } from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Box, Burger, Group, ScrollArea } from '@mantine/core'
import useLayoutStore from '@/Layouts/store/LayoutStore'

const AppLayout = ({ children }: { children: any }) => {
	const { sidebarOpen, sidebarVisible, toggleSidebarOpen, setSidebarVisible } = useLayoutStore()
	// const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	// const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false)
	// const [showSidebarControl, setShowSidebarControl] = useState(false)

	return (
		<AppShell
			header={ { height: 50 } }
			navbar={ {
				width: 200,
				breakpoint: 'sm',
				collapsed: { mobile: !sidebarOpen, desktop: !sidebarOpen },
			} }
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					{ sidebarVisible && <>
						<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } hiddenFrom="sm" size="sm" />
						<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } visibleFrom="sm" size="sm" />
					</> }
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
